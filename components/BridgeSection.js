import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Modular component version - FIXED
const BridgeSection = () => {
  // Data for timeline/roadmap items
  const timelineItems = [
    {
      icon: "🔨",
      status: "Building",
      title: "HPN Medicare v1.0",
      description: "FastAPI + PyTorch healthcare analysis platform focused on predictive diagnostics",
      progressPercentage: 75,
    },
    {
      icon: "🧠",
      status: "Experimenting",
      title: "Claude + LangChain Mentoring Tool",
      description: "Personalized AI-driven learning assistant for software developers",
      progressPercentage: 45,
    },
    {
      icon: "🧪",
      status: "Testing",
      title: "AI Blog Engine",
      description: "Markdown-based authoring system with Claude integration for content enhancement",
      progressPercentage: 90,
    },
    {
      icon: "🚀",
      status: "Launching Soon",
      title: "FinVerse Beta",
      description: "Decentralized financial dashboard with multi-chain portfolio analytics",
      progressPercentage: 95,
    },
  ];

  return (
    <Box 
      sx={{ 
        py: 12, 
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "15%",
          width: "70%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.3), transparent)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "15%",
          width: "70%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)",
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Philosophy Quote Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 10,
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
            }}
          >
            My Building Philosophy
          </Typography>

          {/* Fixed quote box */}
          <Box
            sx={{
              position: "relative",
              py: 6,
              px: { xs: 4, md: 6 },
              mx: "auto",
              maxWidth: "850px",
              textAlign: "center",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(167, 139, 250, 0.2)",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Top quote mark - separate component to avoid CSS issues */}
            <Box
              sx={{
                position: "absolute",
                top: "15px",
                left: "15px",
                fontFamily: "Georgia, serif",
                fontSize: { xs: "5rem", md: "7rem" },
                color: "rgba(167, 139, 250, 0.15)",
                lineHeight: 0.5,
              }}
            >
              &ldquo;
            </Box>
            
            {/* Bottom quote mark - separate component to avoid CSS issues */}
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "15px",
                fontFamily: "Georgia, serif",
                fontSize: { xs: "5rem", md: "7rem" },
                color: "rgba(167, 139, 250, 0.15)",
                lineHeight: 0.5,
              }}
            >
              &rdquo;
            </Box>

            <Typography
              variant="h4"
              component="p"
              sx={{
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.6,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: "rgba(255, 255, 255, 0.9)",
                position: "relative",
                zIndex: 1,
              }}
            >
              Great products aren&apos;t just built. They&apos;re crafted — with vision, code, and relentless curiosity.
            </Typography>
          </Box>
        </Box>

        {/* Timeline/Roadmap Section */}
        <Box sx={{ mt: 8, mb: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 5,
              textAlign: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                width: "60px",
                height: "3px",
                bottom: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                borderRadius: "2px",
              },
            }}
          >
            Journey in Progress
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {timelineItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: "16px",
                    background: "rgba(15, 23, 42, 0.4)",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(167, 139, 250, 0.15)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                      border: "1px solid rgba(167, 139, 250, 0.3)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                      opacity: 0.7,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "3px",
                      left: 0,
                      width: `${item.progressPercentage}%`,
                      height: "3px",
                      background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {item.icon}
                  </Typography>
                  
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "4px",
                      background: "rgba(167, 139, 250, 0.15)",
                      color: "#a78bfa",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      display: "inline-block",
                      mb: 1,
                    }}
                  >
                    {item.status}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            p: 6,
            borderRadius: "20px",
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(167, 139, 250, 0.2)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Background elements as separate components to avoid CSS issues */}
          <Box
            sx={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)",
              top: "-150px",
              right: "-150px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)",
              bottom: "-150px",
              left: "-150px",
            }}
          />
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
              zIndex: 1,
            }}
          >
            Curious About My Development Process?
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.7,
              position: "relative",
              zIndex: 1,
            }}
          >
            Discover how I transform complex ideas into functional, user-friendly applications. Get insights into my methodologies, challenges, and learning experiences.
          </Typography>
          
          <Box 
            sx={{ 
              display: "flex", 
              gap: 3, 
              justifyContent: "center", 
              flexWrap: "wrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/blog"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: "12px",
                background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                boxShadow: "0 10px 25px rgba(96, 165, 250, 0.3)",
                transition: "all 0.3s ease",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 30px rgba(96, 165, 250, 0.5)",
                },
              }}
            >
              Explore My Blog
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/ebook"
              sx={{
                borderRadius: "12px",
                borderColor: "#a78bfa",
                borderWidth: "2px",
                color: "#a78bfa",
                fontSize: "1rem",
                px: 4,
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#60a5fa",
                  backgroundColor: "rgba(167, 139, 250, 0.08)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 20px rgba(167, 139, 250, 0.2)",
                },
              }}
            >
              Download Free eBook
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BridgeSection;