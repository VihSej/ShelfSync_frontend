import Home from "./Home";

export default function HomeScreen() {

  const router = useRouter();
  useEffect(() => {(async () => { 
    if (!(await isLoggedIn()))
      router.push("/login");
  })()}, []);

  return <Home />;
}
