import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Article.css";
import cover from "../assets/post-cover.eps";
import inlineImg from "../assets/post-inline.eps";

// простые данные; позже заменим на API
const POSTS = {
    "scaling-your-business-with-saas-guide-growth": {
        tag: "Management",
        date: "25 September 2025",
        title: "Scaling Your Business to with SaaS Guide Growth and Flexibility",
        cover,
        sections: [
            {
                h: "Cloud-Based Accessibility",
                p: `SaaS platforms offer the advantage of being accessible anywhere, anytime...`
            },
            {
                quote: `“The power of SaaS lies in its ability to scale, automate, and adapt.”`
            },
            {
                h: "Scalability to Match Business Growth",
                p: `One of the key benefits of SaaS is its scalability. As your business grows...`,
                img: inlineImg
            },
            {
                h: "Adapting to a Multi-Device World",
                bullets: [
                    "Cross-platform compatibility is essential.",
                    "Responsive design principles by default.",
                    "Design consistency on all devices.",
                    "More efficient workflows with fewer device-specific tweaks."
                ]
            }
        ]
    }
};

export default function ArticlePage() {
    const { slug } = useParams();
    const post = POSTS[slug];

    if (!post) {
        return (
            <Container className="py-5">
                <h1>Article not found</h1>
                <p><Link to="/blog">Back to blog</Link></p>
            </Container>
        );
    }

    return (
        <>
            {/* HERO */}
            <section className="ArticleHero HemPageDark">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={9}>
                            <div className="SectionBadge">{post.tag}</div>
                            <h1 className="ArticleTitle">{post.title}</h1>
                            <p className="ArticleMeta">{post.date}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg={{ span: 10, offset: 1 }}>
                            <div className="ArticleCover">
                                <img src={post.cover} alt={post.title} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* BODY */}
            <section className="HemPageLight">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            {post.sections.map((s, i) => (
                                <div key={i} className="ArticleBlock">
                                    {s.h && <h5>{s.h}</h5>}
                                    {s.p && <p>{s.p}</p>}
                                    {s.quote && <blockquote>{s.quote}</blockquote>}
                                    {s.img && (
                                        <div className="InlineImage">
                                            <img src={s.img} alt="" />
                                        </div>
                                    )}
                                    {s.bullets && (
                                        <ul>
                                            {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* RELATED */}
            <section className="Related HemPageLight">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <h3 className="mb-4">Related Blogs & News</h3>
                            <Link to="/blog" className="RelatedCard">
                                <div className="thumb" />
                                <div className="text">
                                    <span className="pill">Management</span>
                                    <div className="title">
                                        Scaling Your Business to with SaaS Guide Growth and Flexibility
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
