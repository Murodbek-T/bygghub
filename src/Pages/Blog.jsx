import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import postImg from "../assets/post-cover.jpg";
import "../css/Blog.css";

function ArticleCard({ slug, tag="Management", title, excerpt, image = postImg }) {
    return (
        <Card
            as={Link}
            to={`/blog/${slug}`}
            className="BlogCard d-block text-reset text-decoration-none"
        >
            <Row className="g-0 align-items-center">
                <Col md="auto">
                    <div className="BlogThumb">
                        <img src={image} alt={title} />
                    </div>
                </Col>
                <Col>
                    <Card.Body>
                        <span className="BlogBadge">{tag}</span>
                        <Card.Title className="mb-2">{title}</Card.Title>
                        <Card.Text className="text-muted mb-0">{excerpt}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default function Blog() {
    return (
        <>
            <section className="BlogHero HemPageDark">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={9}>
                            <div className="SectionBadge">Our blog</div>
                            <h1 className="BlogTitle">Useful articles</h1>
                            <p className="BlogSubtitle">
                                Tips, insights, and practical advice for builders and project managers who want
                                less paperwork, smoother communication, and more clarity on site.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="BlogBody HemPageLight">
                <Container>
                    <Row className="g-4">
                        <Col md={8}>
                            <ArticleCard
                                slug="scaling-your-business-with-saas-guide-growth"
                                title="Scaling Your Business with SaaS: Guide to Growth and Flexibility"
                                excerpt="How construction companies reduce admin time, keep projects in sync, and create real transparency using ByggHub-like workflows."
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
