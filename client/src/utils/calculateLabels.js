import { NatureContext } from '../context/natureContext';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

export default function calculateLabels(natures) {
  
    console.log(natures)
  const dateArray = [];
  const durationArray = [];

  function filtering() {
    if (!natures) {
      return; // Return early if natures is null
    }

    for (let i = -7; i <= 7; i++) {
      const currDate = new Date();
      currDate.setDate(currDate.getDate() + i);
      const filteredNature = natures.filter((nature) => {
        const startDate = new Date(nature.startDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(nature.endDate);
        endDate.setHours(23, 59, 59, 999); 
        return startDate <= currDate && currDate <= endDate;
    });
      const totalDuration = filteredNature.reduce((total, nature) => total + nature.duration, 0);
      dateArray.push(`${currDate.getDate()} ${getMonthShortForm(currDate.getMonth())} ${currDate.getFullYear()}`);
      durationArray.push(totalDuration);
    }
    console.log(durationArray)
    return { dateArray, durationArray };
  }

  return filtering();
}


function getMonthShortForm(month) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[month];
}

