import React from "react";
import Head from "next/head";
import { format, parseISO } from "date-fns"; // Add parseISO for consistent date handling
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chip from "@mui/material/Chip";
import Giscus from "@giscus/react";
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostData, getAllPostIds } from '../../lib/posts.server';
import { slugifyTag } from '../../lib/posts';

export default function Post({ postData }) {
  const router = useRouter();

  // Use this function to safely format dates
  const formatDate = (dateString) => {
    try {
      // Parse the ISO string and then format it to ensure consistency
      // between server and client
      const date = parseISO(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return the original string if parsing fails
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{postData.title} | My Blog</title>
        <meta name="description" content={postData.description || ""} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description || ""} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={postData.date} />
      </Head>

      <Container maxWidth="md">
        <Box sx={{ mb: 4, mt: 2 }}></Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 4,
            mt: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {(postData.tags || []).map((tag) => (
            <Link
              href={`/tags/${slugifyTag(tag)}`}
              key={tag}
              passHref
              legacyBehavior
            >
              <Chip
                component="a"
                label={tag}
                clickable
                sx={{
                  backgroundColor: "rgba(167, 139, 250, 0.15)",
                  color: "#a78bfa",
                  borderRadius: 2,
                  fontSize: "0.8rem",
                  "&:hover": {
                    backgroundColor: "rgba(167, 139, 250, 0.25)",
                    boxShadow: "0 0 15px rgba(167, 139, 250, 0.2)",
                  },
                }}
              />
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 2,
              background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
            }}
          >
            {postData.title}
          </Typography>

          <Typography sx={{ mb: 4, color: "text.secondary" }}>
            {postData.date ? formatDate(postData.date) : ''}
          </Typography>

          <Divider sx={{ width: "100%", mb: 4 }} />

          <Box
            component="article"
            sx={{
              width: "100%",
              "& h1": {},
              "& h2": {},
              "& p": {},
            }}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />

          <Divider sx={{ width: "100%", my: 4 }} />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mb: 6,
            }}
          >
            <Link href="/blog" passHref legacyBehavior>
              <Button
                component="a"
                startIcon={<ArrowBackIcon />}
                sx={{
                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(167, 139, 250, 0.2)",
                  },
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Back to all posts
              </Button>
            </Link>
          </Box>

          <Box
            sx={{
              width: "100%",
              mt: 4,
              mb: 6,
              p: 3,
              borderRadius: 2,
              background: "rgba(15, 23, 42, 0.4)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(167, 139, 250, 0.15)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                "&::before": {
                  content: '""',
                  display: "inline-block",
                  width: "4px",
                  height: "24px",
                  backgroundColor: "#a78bfa",
                  marginRight: "12px",
                  borderRadius: "2px",
                },
              }}
            >
              Comments
            </Typography>

            <Giscus
              repo="HPNChanel/hpn-blog-comments"
              repoId="R_kgDOOdAA5Q"
              category="Announcements"
              categoryId="DIC_kwDOOdAA5c4CpTgf"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="dark"
              lang="en"
              loading="lazy"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const postData = await getPostData(params.slug);
    
    // Ensure date is a string in ISO format for consistent parsing
    if (postData.date instanceof Date) {
      postData.date = postData.date.toISOString();
    }
    
    return {
      props: {
        postData,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error fetching post data for ${params.slug}:`, error);
    return {
      notFound: true,
    };
  }
}
