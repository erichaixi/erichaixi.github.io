import Header from "./Header.js";

import {Card, Button} from "react-bootstrap";

import "./Projects.css";

const projects = [
    {
        title: "Time-Lapse Creator",
        description: "Create high-resolution time-lapse videos.",
        link: "https://github.com/erichaixi/lapse"
    }
];

const Projects = () => {
    return (
        <div>
            <Header/>
            <section className="section-projects">
                {projects.map(obj => (
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{obj.title}</Card.Title>
                            <Card.Text>{obj.description}</Card.Text>
                            <a href={obj.link}>
                                <Button variant="primary">
                                    Github Repo
                                </Button>
                            </a>
                        </Card.Body>
                    </Card>
                ))}
            </section>
        </div>
    );
}

export default Projects;