import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNotification } from "./notificationsSlice";
import { generateNotification } from "./generateNotification";
import { selectIsSimulating } from "./selectors";

// While the simulator is on, push a random notification every 3-4 seconds.
// Mount this once near the app root so it runs regardless of the dropdown.
export const useNotificationSimulator = (): void => {
  const dispatch = useAppDispatch();
  const simulating = useAppSelector(selectIsSimulating);

  useEffect(() => {
    if (!simulating) return;

    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        dispatch(addNotification(generateNotification()));
        schedule();
      }, 3000 + Math.random() * 1000);
    };
    schedule();

    return () => clearTimeout(timer);
  }, [simulating, dispatch]);
};
