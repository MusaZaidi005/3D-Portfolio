import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import LazySection from "./components/LazySection";

const loadSkills = () => import("./components/sections/Skills");
const loadExperience = () => import("./components/sections/Experience");
const loadProjects = () => import("./components/sections/Projects");
const loadEducation = () => import("./components/sections/Education");
const loadContact = () => import("./components/sections/Contact");
const loadFooter = () => import("./components/sections/Footer");

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
      <Navbar />
        <Body as="main">
          <div>
            <Hero />
            <Wrapper>
              <LazySection load={loadSkills} id="Skills" />
              <LazySection load={loadExperience} id="Experience" />
            </Wrapper>
            <LazySection load={loadProjects} id="Projects" />
            <Wrapper>
              <LazySection load={loadEducation} id="Education" />
              <LazySection load={loadContact} id="Contact" />
            </Wrapper>
            <LazySection load={loadFooter} minHeight={200} />
          </div>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
