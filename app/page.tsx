// import Menu from "@/components/Menu";
import RecentBookAdd from "@/components/RecentBooksAdd";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div>
      {/* <Menu /> */}
      {/* <SearchBar /> */}

      <div>
        <RecentBookAdd />
        <SearchBar /> 
      </div>
    </div>
  );
}
