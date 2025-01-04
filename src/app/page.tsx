"use client"

import Image from "next/image";
import { getValidWeeks, getUserInfo, getUserDiaryInfo, getAllWeeklyData, getWeekData } from "@/lib/lastfm";
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const wrapper = async () => {
      const weekInfo = await getUserDiaryInfo("lemonadepsd")
      // const weekInfo = await getWeekData("lemonadepsd", {from: "1587902400", to: "1588507200"})
      console.log(weekInfo)
    }
    wrapper()

  }, [])
  return (
    <div>
      <p>BASE</p>
    </div>
  );
}
