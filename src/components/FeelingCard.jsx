import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";


function FeelingCard() {
const navigate = useNavigate();

    const animos = [
        {name: "feliz", image: "https://static.vecteezy.com/system/resources/previews/009/931/402/non_2x/happy-smiling-emoji-cartoon-happiness-emoticon-smile-face-vector.jpg"},
        {name: "triste", image: "https://static.vecteezy.com/system/resources/previews/022/932/677/non_2x/disappointed-emoji-sad-face-unhappy-emoticon-free-vector.jpg"},
        {name: "melancolico", image: "https://www.psicologosencostarica.com/wp-content/uploads/2023/06/Estado-melancolico.jpg"},
    ];

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: 4 }}>
      {animos.map((animo) => (
        <Grid item xs={12} sm={6} md={4} key={animo.name}>
          <Card
            onClick={() => navigate(`/playlist/animo/${animo.name}`)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <CardMedia component="img" height="150" image={animo.image} alt={animo.name} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {animo.name.toUpperCase()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default FeelingCard;