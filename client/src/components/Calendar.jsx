import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calenadr.css';


export default function CalendarGfg() {
    const [value, onChange] = useState(new Date());

    return (
        <div className='w-[400px] h-auto p-4 bg-red-500 rounded-lg shadow-md'>
            <h1 className='text-5xl'>Calendar - GeeksforGeeks</h1>
            <Calendar onChange={onChange} value={value} className="h-[1000px]"/>
        </div>
    );
}