import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import bgImgage from '../../../assets/images/bg.png';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    return (
        <header className='my-6' style={{backgroundImage: `url(${bgImgage})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='dentist chair' className="lg:max-w-sm w-full rounded-lg shadow-2xl" />
                    <div className='mr-6'>
                        <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;