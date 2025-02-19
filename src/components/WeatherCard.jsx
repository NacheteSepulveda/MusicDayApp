import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

function WeatherCard() {

    const navigate = useNavigate();

    const estados = [
        {name: "soleado", image: "https://previews.123rf.com/images/rozum/rozum1108/rozum110800071/10122270-paisaje-hermoso-y-soleado-composici%C3%B3n-de-la-naturaleza.jpg"},
        {name: "nublado", image: "https://img.freepik.com/fotos-premium/puesta-sol-playa-dia-nublado-verano_212328-909.jpg"},
        {name: "lluvioso", image: "https://previews.123rf.com/images/sergpet/sergpet1703/sergpet170300078/74551314-gotas-de-lluvia-en-la-ventana-d%C3%ADa-lluvioso.jpg"}
    ];

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: 4 }}>
      {estados.map((estado) => (
        <Grid item xs={12} sm={6} md={4} key={estado.name}>
          <Card
            onClick={() => navigate(`/playlist/${estado.name}`)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <CardMedia component="img" height="150" image={estado.image} alt={estado.name} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                {estado.name.toUpperCase()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default WeatherCard