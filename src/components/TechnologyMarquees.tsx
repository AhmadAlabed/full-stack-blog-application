"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Marquee from "react-fast-marquee";
const technologyArr = [
  {
    src: "/images/technologies/next-js.png",
    alt: "Next-js",
    width: 70,
    height: 70,
  },
  {
    src: "/images/technologies/auth-js.png",
    alt: "Auth.js",
    width: 70,
    height: 70,
  },
  {
    src: "/images/technologies/mongodb.png",
    alt: "Mongo DB",
    width: 70,
    height: 70,
  },
  {
    src: "/images/technologies/mongoose-js.png",
    alt: "Mongoose js",
    width: 70,
    height: 70,
  },
  {
    src: "/images/technologies/mui.png",
    alt: "MUI",
    width: 70,
    height: 70,
  },
  {
    src: "/images/technologies/zod.png",
    alt: "Zod",
    width: 70,
    height: 70,
  },
  {
    src: "/images/technologies/react-hook-form.png",
    alt: "React Hook Form",
    width: 70,
    height: 70,
  },
];

const TechnologyMarquees = () => {
  return (
    <Marquee
      autoFill={true}
      pauseOnHover={true}
      gradientColor="#121212"
      gradient={true}
      gradientWidth={100}
    >
      {technologyArr.map((image, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "end",
            }}
            key={index}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={{
                display: "block",
                marginInline: "60px",
                marginBlock: "20px",
              }}
            />
            <Typography variant="body1" color="primary" sx={{ opacity: 0.4 }}>
              {image.alt}
            </Typography>
          </Box>
        );
      })}
    </Marquee>
  );
};

export default TechnologyMarquees;
