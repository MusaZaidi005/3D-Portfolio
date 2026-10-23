import React from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;


const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// "Dec 2024 - Feb 2025", "JUNE 2023 – FEB 2024", "2026 - Present", "2025" -> [start, end] as sortable numbers
const parsePart = (part) => {
  if (/present/i.test(part)) return Infinity;
  const year = Number((part.match(/\d{4}/) || [0])[0]);
  const month = MONTHS.indexOf(part.trim().slice(0, 3).toLowerCase());
  return year * 12 + Math.max(month, 0);
};
const parseRange = (date) => {
  const [start, end = start] = date.split(/\s*[-–]\s*/);
  return [parsePart(start), parsePart(end)];
};

// Newest first: by end date, then start date.
const sortedProjects = [...projects].sort((a, b) => {
  const [aStart, aEnd] = parseRange(a.date);
  const [bStart, bEnd] = parseRange(b.date);
  return bEnd - aEnd || bStart - aStart;
});

const Projects = () => {
  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>

        <CardContainer>
          {sortedProjects
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
