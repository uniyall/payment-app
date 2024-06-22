function Button({ children, isSubmitting }) {
  return <button type="submit" disabled={isSubmitting} className="bg-slate-800 text-white rounded-md p-2 w-full">{children}</button>;
}

export default Button;
