"use client";

import { useState } from "react";
import Link from "next/link";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify/amplify_outputs.json";
import Image from "next/image";
import Landing from "./components/Landing";
import SummitDetails from "./components/SummitDetails";
import SummitSection from "./components/SummitSection";

Amplify.configure(outputs);

export default function HomePage() {
  return (<>
   <Landing />
    <SummitSection />
    <SummitDetails />
  </>
   
  );
}
