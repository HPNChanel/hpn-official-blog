import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { slugifyTag } from '../lib/posts'; // Only import client-safe functions

// Performance optimization: memoize the formatted date
const FormattedDate = ({ dateString }) => {
  const formattedDate = React.useMemo(() => {
    return format(new Date(dateString), "MMMM d, yyyy");
  }, [dateString]);

  return (
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {formattedDate}
    </Typography>
  );
};

export default function Blog({ allPosts }) {
  return (
    <>
      <Head>
        {/* Using template literal to ensure proper string handling */}
        <title>{`Blog | My Personal Website`}</title>
        <meta
          name="description"
          content="Read my latest thoughts and articles on web development, blockchain, and more."
        />
      </Head>

      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2
          }}
        >
          All Posts
        </Typography>

        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align="center"
          sx={{ maxWidth: 700, mx: "auto", mb: 3 }}
        >
          Thoughts, tutorials, and insights on Web3, blockchain technology, and modern web development.
        </Typography>

        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Link href="/tags" passHref legacyBehavior>
            <Typography
              component="a"
              variant="body2"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underline",
                  color: "primary.light"
                }
              }}
            >
              Browse posts by tags
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ mb: 6 }} />
        
        {/* Updated Grid with MUI v2 syntax */}
        <Grid 
          columns={{ xs: 4, sm: 8, md: 12 }} 
          columnSpacing={3}
          rowSpacing={3}
        >
          {allPosts.map((post) => (
            <Grid 
              key={post.id}
              gridColumn={{ xs: 'span 4', sm: 'span 4', md: 'span 4' }}
            >
              <Link href={`/posts/${post.id}`} passHref legacyBehavior>
                <CardActionArea component="a" sx={{ height: "100%" }}>
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) => `0 6px 20px ${theme.palette.primary.dark}40`,
                        "& .MuiCardContent-root": {
                          borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`
                        }
                      }
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        height: "100%",
                        borderLeft: "4px solid transparent",
                        transition: "border-left 0.2s ease-in-out"
                      }}
                      className="MuiCardContent-root"
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          height: "3.5rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        {post.title}
                      </Typography>

                      <FormattedDate dateString={post.date} />

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2
                        }}
                      >
                        {(post.tags || []).map((tag) => (
                          // Wrap with div that handles stopping propagation
                          <div
                            key={tag}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Link
                              href={`/tags/${slugifyTag(tag)}`}
                              passHref
                              legacyBehavior
                            >
                              <Chip
                                component="a"
                                label={tag}
                                size="small"
                                clickable
                                sx={{
                                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                                  color: "#a78bfa",
                                  borderRadius: 1,
                                  fontSize: "0.7rem",
                                  cursor: "pointer",
                                  "&:hover": {
                                    backgroundColor: "rgba(167, 139, 250, 0.25)"
                                  }
                                }}
                              />
                            </Link>
                          </div>
                        ))}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          height: "4.5rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  // Dynamic import for server-only code
  const { getSortedPostsData } = await import("../lib/posts.server");
  const allPosts = getSortedPostsData();

  return {
    props: {
      allPosts,
    },
    revalidate: 3600,
  };
}
