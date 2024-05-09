import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-4">
        <h3>Welcome to Techloset Simple POS for small business</h3>
        <p>
          Crafting a seamless Point of Sale (POS) solution, Techloset
          revolutionizes retail experiences with intuitive interfaces, robust
          inventory management, and streamlined transactions for businesses of
          all sizes.
        </p>
        <p>If you have any issue,call 111-111-987 anytime</p>
        <Link to="/pos" className="btn btn-primary">
          Click here to sell products
        </Link>
      </div>
    </MainLayout>
  );
}
