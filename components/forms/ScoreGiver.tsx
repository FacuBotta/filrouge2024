'use client';

import { ScoreGiverRef } from '@/types/types';
import { Icon } from 'facu-ui';
import { forwardRef, useImperativeHandle, useState } from 'react';

const ScoreGiver = forwardRef<ScoreGiverRef>((_, ref) => {
  const [score, setScore] = useState(0);

  useImperativeHandle(ref, () => ({
    getScore: () => score,
  }));

  return (
    <div>
      <p>Donne une ponctuation !</p>
      <div className="flex gap-2 items-center my-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Icon key={value} type="star" onClick={() => setScore(value)} />
        ))}
      </div>
    </div>
  );
});

ScoreGiver.displayName = 'ScoreGiver';

export default ScoreGiver;
