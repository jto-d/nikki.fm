"use client"

import Image from "next/image";
import { getValidWeeks, getUserInfo, getUserDiaryInfo, getWeekData } from "@/lib/lastfm";
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const wrapper = async () => {
      const data = await getUserInfo("lemonadepsd")
      const weeks = await getValidWeeks("lemonadepsd", data.user.registered.unixtime)
      console.log(weeks)

      const weekInfo = await getWeeklyData("lemonadepsd", weeks[0])
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
