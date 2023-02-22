import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  console.log('router', router);

  return <div>Coffee store Page {router.query.id}</div>
}

export default CoffeeStore;