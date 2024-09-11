'use client';
import { Reorder, useDragControls } from 'framer-motion';
import { DragControlTasks } from './dragControlTasks';

export default function DragItemTasks({
  value,
  children,
}: {
  value: any;
  children: React.ReactNode;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      className="flex gap-3 items-center mt-1"
    >
      <div className="size-5">
        <DragControlTasks dragControls={controls} />
      </div>

      {children}
    </Reorder.Item>
  );
}
