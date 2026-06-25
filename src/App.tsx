import "./App.scss";
import clsx from "clsx";
import NotificationCenter from "./components/NotificationCenter";
import { useNotificationSimulator } from "./features/notifications/useNotificationSimulator";

const CN = "app";

function App() {
  useNotificationSimulator();

  return (
    <div className={clsx(CN)}>
      <header className={clsx(`${CN}__topbar`)}>
        <NotificationCenter userName="John Doe" />
      </header>

      <main className={clsx(`${CN}__main`)}>
        <div className={clsx(`${CN}__hint`)}>
          <h1>Notifications Dropdown</h1>
          <p>Open the menu from the bell or the user pill in the top-right.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
