import { findRunData } from "@/server/controller/run";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req?: NextApiRequest, res?: NextApiResponse) {
  const data = await findRunData();
  return data
  // return NextResponse.json({
  //   data,
  // });
}
