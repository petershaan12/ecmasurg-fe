import SignupForm from "../components/Auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center space-x-20 min-h-screen ">
      <main>
        <SignupForm />
      </main>
      <img
        src="/signupImage.svg"
        alt="logo"
        width={350}
        height={100}
        className="mt-12 hidden sm:block"
      />
    </div>
  );
};

export default SignUp;
