import React from 'react';
import appointmentBg from '../../../assets/images/appointment.png';

const ContactUs = () => {
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;
    }

    return (
        <div className='mt-20 pt-20 pb-20 mb-20' style={{ background: `url(${appointmentBg})` }}>
            <div className='text-center mb-5'>
                <p className="text-emerald-400 font-bold text-2xl">Contact Us</p>
                <h1 className="text-4xl">Stay connected with us</h1>
            </div>
            <form className='text-center mt-5 mx-20' onSubmit={handleSubmit}>
                <input type="email" name='email' placeholder="Email Address" className="input input-bordered my-3 w-3/5" required />
                <input type="text" name="subject" placeholder="Subject" className="input input-bordered w-3/5 my-3" required />
                <textarea name='message' className="textarea textarea-bordered mx-15 w-3/5 my-3" rows={5} placeholder="Your Message" required></textarea>
                <button type='submit' className="btn bg-gradient-to-r from-emerald-400 to-cyan-300 text-white border-0 w-3/5">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;