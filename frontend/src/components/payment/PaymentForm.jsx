import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreditCard from 'react-credit-cards-2';
import { motion } from 'framer-motion';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState(prev => ({ ...prev, focus: e.target.name }));
  };

  // const onSubmit = (data) => {
  //   console.log('Payment submitted:', data);
  //   // Here you would typically handle the payment processing
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" w-full md:h-screen mx-auto p-6 bg-white rounded-xl shadow-xl  "
    >
      <div className='my-10'>
        <p className='text-xl lg:text-3xl font-bold font-happy'>Enter your card details</p>
      </div>
      <div className="mb-8 ">
        <CreditCard
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            name="number"
            {...register('number', { required: true, pattern: /^[0-9]{16}$/ })}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="1234 5678 9012 3456"
          />
          {errors.number && <span className="text-red-500 text-xs">Valid card number is required</span>}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
          <input
            type="text"
            name="name"
            {...register('name', { required: true })}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="John Doe"
          />
          {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              name="expiry"
              {...register('expiry', { required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/ })}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="MM/YY"
            />
            {errors.expiry && <span className="text-red-500 text-xs">Valid expiry date required</span>}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700">CVC</label>
            <input
              type="text"
              name="cvc"
              {...register('cvc', { required: true, pattern: /^[0-9]{3,4}$/ })}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="123"
            />
            {errors.cvc && <span className="text-red-500 text-xs">Valid CVC required</span>}
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 animate-gradient "
        >
          Pay Now
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PaymentForm;