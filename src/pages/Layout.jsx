import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  return (
    <Container className="main-container vh-100" fluid>
      <Row className="h-100">
        <Col xs={2} className="p-0">
          <Navbar />
        </Col>
        <Col xs={10} className="">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;