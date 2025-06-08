import Daily from "@/components/daily/Daily";
import Partners from "@/components/partners/Partners";
import Tasks from "@/components/tasks/Tasks";
import Wins from "@/components/wins/Wins";


export default function Home() {
  return (
    <div>
      <Wins />
      <Daily />
      <Tasks />
      <div style={{ marginBottom: '120px' }}><Partners /></div>

    </div>

  );
}
