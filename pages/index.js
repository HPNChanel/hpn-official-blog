import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BridgeSection from "../components/BridgeSection";
import ScrollReveal from "../components/ScrollReveal";
// Optional: animated backgrounds with useEffect
export default function Home({ recentPosts }) {
  // Used for subtle animation effect on scroll
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated gradient effect based on scroll position
  const gradientOffset = Math.min(scrollY * 0.05, 20);

  return (
    <>
      <Head>
        <title>HPN Blog</title>
        <meta
          name="description"
          content="Personal blog and portfolio of Phuc Nguyen, a Web3 developer and blockchain enthusiast sharing insights on modern development."
        />
      </Head>

      {/* Main container with animated background */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: `-${gradientOffset}%`,
            left: 0,
            width: "100%",
            height: "150%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.15) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.1) 0%, transparent 40%)",
            zIndex: -1,
            transition: "all 0.3s ease-out",
          },
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 8, md: 12 },
            overflow: "hidden",
            // Gradient background effect
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle at 20% 30%, rgba(167, 139, 250, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)",
              zIndex: -1,
            },
          }}
        >
          <Container maxWidth="lg">
            <ScrollReveal>
              <Typography variant="h3" component="h2">
                Recent Articles
              </Typography>
            </ScrollReveal>
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              {/* Main content */}
              <Grid item xs={12} md={10} lg={8}>
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 2, sm: 4, md: 5 },
                    borderRadius: "24px",
                    background: "rgba(16, 24, 40, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    overflow: "hidden",
                    // Optional glow accent in corner
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "-50px",
                      right: "-50px",
                      width: "100px",
                      height: "100px",
                      background: (theme) =>
                        `radial-gradient(circle, ${theme.palette.primary.main}40 0%, transparent 70%)`,
                      borderRadius: "50%",
                      zIndex: 0,
                    },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: "1rem",
                      letterSpacing: "0.1em",
                      mb: 2,
                      display: "block",
                      color: (theme) => theme.palette.primary.light,
                      position: "relative",
                    }}
                  >
                    Hello, I&apos;m
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 2,
                      background:
                        "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      position: "relative",
                      display: "inline-block",
                      // Subtle glow effect using box-shadow
                      textShadow: "0 0 40px rgba(96, 165, 250, 0.5)",
                    }}
                  >
                    Phuc Nguyen - HPN Chanel
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "rgba(255, 255, 255, 0.9)",
                      position: "relative",
                    }}
                  >
                    Web3 Developer & Blockchain Enthusiast
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      mb: 4,
                      maxWidth: "600px",
                      mx: { xs: "auto", md: 0 },
                      color: "rgba(255, 255, 255, 0.7)",
                      lineHeight: 1.7,
                      position: "relative",
                    }}
                  >
                    Building the decentralized future with innovative
                    applications and smart contracts. I&apos;m passionate about
                    creating Web3 experiences that are both powerful and
                    accessible.
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexWrap: "wrap",
                      justifyContent: { xs: "center", md: "flex-start" },
                      position: "relative",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      href="/portfolio"
                      sx={{
                        borderRadius: "12px",
                        background:
                          "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                        fontSize: "1rem",
                        px: 3,
                        py: 1.2,
                        boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
                        transition: "all 0.3s ease",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 10px 25px rgba(96, 165, 250, 0.5)",
                        },
                      }}
                    >
                      View My Work
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      href="/blog"
                      sx={{
                        borderRadius: "12px",
                        borderColor: (theme) => theme.palette.primary.main,
                        borderWidth: "2px",
                        color: (theme) => theme.palette.primary.main,
                        fontSize: "1rem",
                        px: 3,
                        py: 1.1,
                        textTransform: "none",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: (theme) => theme.palette.secondary.main,
                          backgroundColor: "rgba(167, 139, 250, 0.08)",
                          transform: "translateY(-3px)",
                        },
                      }}
                    >
                      Read Blog
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Quote Section */}
        <Box sx={{ py: 6, position: "relative" }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                position: "relative",
                py: 8,
                px: { xs: 4, md: 8 },
                textAlign: "center",
                borderRadius: "20px",
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(167, 139, 250, 0.2)",
                boxShadow:
                  "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 80px rgba(96, 165, 250, 0.08)",
                "&::before, &::after": {
                  content: '"“"',
                  position: "absolute",
                  fontFamily: "Georgia, serif",
                  fontSize: { xs: "6rem", md: "8rem" },
                  color: "rgba(167, 139, 250, 0.15)",
                  lineHeight: 0.8,
                },
                "&::before": {
                  top: "20px",
                  left: "20px",
                },
                "&::after": {
                  content: '"“"',
                  bottom: "0px",
                  right: "20px",
                },
              }}
            >
              <AutoAwesomeIcon
                sx={{
                  fontSize: "2rem",
                  color: "#a78bfa",
                  mb: 2,
                  filter: "drop-shadow(0 0 10px rgba(167, 139, 250, 0.5))",
                }}
              />

              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.5,
                  fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                The intersection of blockchain technology and user experience is
                where true innovation happens. I&apos;m dedicated to building
                bridges between complex tech and everyday users.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Featured Section */}
        <Box sx={{ py: 10, position: "relative" }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              {/* Featured title and text */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      letterSpacing: 2,
                      color: "#a78bfa",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      "&::before": {
                        content: '""',
                        display: "inline-block",
                        width: "30px",
                        height: "2px",
                        backgroundColor: "#a78bfa",
                        marginRight: "10px",
                      },
                    }}
                  >
                    FEATURED
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: "2rem", sm: "2.5rem" },
                    }}
                  >
                    Explore My Latest Work
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mb: 4,
                      fontSize: "1.1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    From blockchain applications to interactive web experiences,
                    my projects combine cutting-edge technology with thoughtful
                    design. Dive into my portfolio to see how I&apos;m building
                    for the decentralized future.
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    href="/portfolio"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: "12px",
                      background:
                        "linear-gradient(90deg, rgba(167, 139, 250, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)",
                      color: "#a78bfa",
                      border: "2px solid #a78bfa",
                      fontSize: "1rem",
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0%, rgba(96, 165, 250, 0.2) 100%)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 15px rgba(167, 139, 250, 0.3)",
                      },
                    }}
                  >
                    View All Projects
                  </Button>
                </Box>
              </Grid>

              {/* Featured project preview
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    height: { xs: "250px", md: "300px" },
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "radial-gradient(circle at center, rgba(96, 165, 250, 0.2) 0%, rgba(15, 23, 42, 0.8) 60%)",
                    backdropFilter: "blur(5px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
                      "& .project-title": {
                        transform: "translateY(0)",
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Box
                    className="project-title"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      p: 3,
                      background:
                        "linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)",
                      transform: "translateY(10px)",
                      opacity: 0.9,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <StarIcon sx={{ mr: 1, color: "#a78bfa" }} />
                      Featured Project: FinVerse DeFi Dashboard
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: 1 }}
                    >
                      A comprehensive financial management platform for crypto
                      assets
                    </Typography>
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
          </Container>
        </Box>

        {/* ========== BEGIN BRIDGE SECTION ========== */}
        <BridgeSection />
        {/* ========== END BRIDGE SECTION ========== */}

        {/* Recent Blog Posts */}
        <Box sx={{ py: 10, position: "relative" }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6, textAlign: "center" }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  position: "relative",
                  display: "inline-block",
                  background:
                    "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "60%",
                    height: "4px",
                    bottom: "-10px",
                    left: "20%",
                    background:
                      "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                    borderRadius: "2px",
                  },
                }}
              >
                Recent Articles
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  maxWidth: "700px",
                  mx: "auto",
                  mt: 4,
                  mb: 6,
                  fontSize: "1.1rem",
                }}
              >
                Dive into my latest thoughts on blockchain technology, Web3
                development, and the future of the internet.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {recentPosts.slice(0, 3).map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                    <CardActionArea component="a" sx={{ height: "100%" }}>
                      <Card
                        elevation={4}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "16px",
                          transition: "all 0.3s ease-in-out",
                          background: "rgba(15, 23, 42, 0.6)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(167, 139, 250, 0.1)",
                          overflow: "hidden",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-10px)",
                            boxShadow:
                              "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(167, 139, 250, 0.2)",
                            "& .card-gradient": {
                              opacity: 0.7,
                            },
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "5px",
                            background:
                              "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
                          },
                        }}
                      >
                        <Box
                          className="card-gradient"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              "radial-gradient(circle at top right, rgba(167, 139, 250, 0.15), transparent 70%)",
                            opacity: 0.3,
                            transition: "opacity 0.3s ease",
                            zIndex: 0,
                          }}
                        />

                        <CardContent
                          sx={{
                            p: 3,
                            position: "relative",
                            zIndex: 1,
                            flexGrow: 1,
                          }}
                        >
                          {/* Random technology tags for visual interest */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              mb: 2,
                              flexWrap: "wrap",
                            }}
                          >
                            <Chip
                              label={post.category || "Web3"}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(167, 139, 250, 0.15)",
                                color: "#a78bfa",
                                borderRadius: "6px",
                                fontSize: "0.7rem",
                              }}
                            />
                          </Box>

                          <Typography
                            variant="h6"
                            component="h3"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              fontSize: "1.25rem",
                              height: "3rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {post.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              fontSize: "0.9rem",
                              height: "4rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {post.excerpt}
                          </Typography>

                          <Divider sx={{ my: 2 }} />

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: "0.8rem" }}
                            >
                              {format(new Date(post.date), "MMMM d, yyyy")}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "#60a5fa",
                                fontSize: "0.8rem",
                              }}
                            >
                              Read More
                              <ArrowForwardIcon
                                fontSize="small"
                                sx={{ ml: 0.5 }}
                              />
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </CardActionArea>
                  </Link>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 6 }}>
              <Button
                component={Link}
                href="/blog"
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  borderColor: "#a78bfa",
                  borderWidth: "2px",
                  color: "#a78bfa",
                  fontSize: "1rem",
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#60a5fa",
                    backgroundColor: "rgba(167, 139, 250, 0.08)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 15px rgba(167, 139, 250, 0.2)",
                  },
                }}
              >
                View All Articles
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  // Dynamically import server-side code
  const { getSortedPostsData } = await import("../lib/posts.server");
  const allPosts = getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);

  return {
    props: {
      recentPosts,
    },
  };
}
