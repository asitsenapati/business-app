import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Avatar,
  Divider,
  Grid,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PetsIcon from "@mui/icons-material/Pets";

type Pet = {
  id: number;
  name: string;
  type: string;
  age: string;
};

function PetManagement() {
  const [user] = useState(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState<Omit<Pet, "id">>({
    name: "",
    type: "",
    age: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    type?: string;
    age?: string;
  }>({});

  // Fetch pets from API on mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/pets/list/" + user.id);
        if (res.ok) {
          const data = await res.json();
          setPets(data.pets);
        } else {
          setMessage("Failed to load pets.");
        }
      } catch {
        setMessage("Failed to load pets.");
      }
    };
    fetchPets();
  }, [user.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Pet name is required";
    if (!form.type.trim()) newErrors.type = "Type is required";
    if (!form.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(form.age)) || Number(form.age) < 0) {
      newErrors.age = "Age must be a valid number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (editingId !== null) {
      // Update pet via API, include userId
      try {
        const res = await fetch(
          `http://localhost:5000/pets/update/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, userId: user.id }),
          }
        );
        if (res.ok) {
          const updated = await res.json();
          setPets(pets.map((p) => (p.id === editingId ? updated.pet : p)));
          setMessage("Pet updated!");
        } else {
          setMessage("Failed to update pet.");
        }
      } catch {
        setMessage("Failed to update pet.");
      }
      setEditingId(null);
    } else {
      // Add pet via API, include userId
      try {
        const res = await fetch("http://localhost:5000/pets/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, userId: user.id }),
        });
        if (res.ok) {
          const added = await res.json();
          setPets([...pets, added.pet]);
          setMessage("Pet added!");
        } else {
          setMessage("Failed to add pet.");
        }
      } catch {
        setMessage("Failed to add pet.");
      }
    }
    setForm({ name: "", type: "", age: "" });
    setShowForm(false);
    setErrors({});
  };

  const handleEdit = (pet: Pet) => {
    setForm({ name: pet.name, type: pet.type, age: pet.age });
    setEditingId(pet.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/pets/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPets(pets.filter((p) => p.id !== id));
        setMessage("Pet deleted.");
      } else {
        setMessage("Failed to delete pet.");
      }
    } catch {
      setMessage("Failed to delete pet.");
    }
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", type: "", age: "" });
      setShowForm(false);
    }
  };

  const handleAddClick = () => {
    setForm({ name: "", type: "", age: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", type: "", age: "" });
    setErrors({});
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        px: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1500&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 1, md: 4 } }}>
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            mx: "auto",
            p: { xs: 2, sm: 4, md: 6 },
            borderRadius: 5,
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
          }}
        >
          <Grid container spacing={6} alignItems="flex-start">
            {/* Pet List */}
            <Grid item xs={12} md={7} lg={8}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    mr: 2,
                    width: 60,
                    height: 60,
                    boxShadow: 3,
                  }}
                >
                  <PetsIcon fontSize="large" />
                </Avatar>
                <Typography
                  variant="h3"
                  component="h2"
                  fontWeight={900}
                  color="primary.dark"
                >
                  Your Pets
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  px: 5,
                  py: 1.5,
                  fontSize: "1.15rem",
                  borderRadius: 3,
                  boxShadow: 2,
                  letterSpacing: 1,
                }}
                onClick={handleAddClick}
              >
                Add Pet
              </Button>
              {message && (
                <Alert
                  severity="info"
                  sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}
                >
                  {message}
                </Alert>
              )}
              <List sx={{ width: "100%", px: 0 }}>
                {pets.map((p) => (
                  <ListItem
                    key={p.id}
                    divider={false}
                    sx={{
                      bgcolor: "#f5f7fa",
                      borderRadius: 3,
                      mb: 2,
                      boxShadow: 2,
                      alignItems: "flex-start",
                      px: 2,
                      py: 2,
                      "&:hover": { boxShadow: 6, bgcolor: "#e3f2fd" },
                      transition: "all 0.2s",
                    }}
                    secondaryAction={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEdit(p)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(p.id)}
                          sx={{ mr: 2 }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Box>
                    }
                    disableGutters
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "secondary.light",
                          mr: 2,
                          width: 48,
                          height: 48,
                          boxShadow: 1,
                        }}
                      >
                        <PetsIcon fontSize="medium" />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          fontWeight={700}
                          fontSize="1.18rem"
                          sx={{
                            mb: 0.2,
                            wordBreak: "break-word",
                            color: "primary.main",
                          }}
                        >
                          {p.name}{" "}
                          <span style={{ color: "#888", fontWeight: 400 }}>
                            ({p.type})
                          </span>
                        </Typography>
                        <Typography fontSize="1.05rem" color="text.secondary">
                          Age: {p.age}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
                {pets.length === 0 && (
                  <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center", mt: 4 }}
                  >
                    No pets added yet.
                  </Typography>
                )}
              </List>
            </Grid>
            {/* Form */}
            <Grid item xs={12} md={5} lg={4}>
              {showForm && (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    mb: 3,
                    bgcolor: "#f5f7fa",
                    borderRadius: 3,
                    boxShadow: 2,
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="primary"
                    sx={{ mb: 2 }}
                  >
                    {editingId !== null ? "Edit Pet" : "Add Pet"}
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      name="name"
                      label="Pet Name"
                      value={form.name}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                    <TextField
                      name="type"
                      label="Type (e.g., Dog, Cat)"
                      value={form.type}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      error={!!errors.type}
                      helperText={errors.type}
                    />
                    <TextField
                      name="age"
                      type="number"
                      label="Age"
                      value={form.age}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      inputProps={{ min: 0 }}
                      error={!!errors.age}
                      helperText={errors.age}
                    />
                    <Stack direction="row" spacing={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 700 }}
                      >
                        {editingId !== null ? "Update" : "Add"} Pet
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        sx={{ fontWeight: 600 }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default PetManagement;
