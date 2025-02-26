'use client';

import { GoogleCalendarIcon } from '@/public/images/icons/GoogleCalendarIcon';
import { Office365Icon } from '@/public/images/icons/Office365Icon';
import { OutlookIcon } from '@/public/images/icons/OutlookIcon';
import { YahooIcon } from '@/public/images/icons/YahooIcon';
import { BasicEventData } from '@/types/types';
import {
  CalendarEvent,
  google,
  office365,
  outlook,
  yahoo,
} from 'calendar-link';
import React from 'react';

interface AddToCalendarButtonProps {
  className?: string;
  event: BasicEventData;
}

export default function AddToCalendarButton({
  event,
}: AddToCalendarButtonProps): React.ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const parseEvent: CalendarEvent = {
    title: event.title,
    description: event.description as string,
    start: event.eventStart,
    location: event.formattedAddress as string,
    url: `${baseUrl}/events/event/${event.id}`,
  };
  if (event.eventEnd) {
    // Convertir a objetos Date
    const startDate = new Date(event.eventStart);
    const endDate = new Date(event.eventEnd);

    // Convertir las fechas a milisegundos
    const diffMs = endDate.getTime() - startDate.getTime();

    // Convertir la diferencia a minutos
    const diffMinutes = diffMs / (1000 * 60);

    let duration: [number, string];

    // Si la diferencia es de al menos un día (1440 minutos)
    if (diffMinutes >= 1440) {
      const days = Math.floor(diffMinutes / 1440);
      duration = [days, 'days'];
    }
    // Si la diferencia es de al menos una hora
    else if (diffMinutes >= 60) {
      const hours = Math.floor(diffMinutes / 60);
      duration = [hours, 'hours'];
    }
    // Caso: menor a 1 hora
    else {
      duration = [Math.floor(diffMinutes), 'minutes'];
    }

    parseEvent.end = duration;
  } else {
    parseEvent.allDay = true;
  }
  const googleLink = google(parseEvent);
  const yahooLink = yahoo(parseEvent);
  const office365Link = office365(parseEvent);
  const outlookLink = outlook(parseEvent);
  return (
    <div className="flex flex-col gap-2 text-center ">
      <p>Ajouter à mon calendrier</p>
      <ul className="flex flex-wrap  text-xs">
        <li className="hover:bg-dark-borderCards/30 p-2 rounded-lg">
          <a
            className="gap-1 flex flex-col justify-between"
            href={googleLink}
            target="_blank"
            rel="noreferrer"
          >
            <GoogleCalendarIcon />
            <span>Google</span>
          </a>
        </li>
        <li className="hover:bg-dark-borderCards/30 p-2 rounded-lg">
          <a
            className="gap-1 flex flex-col justify-between"
            href={outlookLink}
            target="_blank"
            rel="noreferrer"
          >
            <OutlookIcon />
            <span>Outlook</span>
          </a>
        </li>
        <li className="hover:bg-dark-borderCards/30 p-2 rounded-lg">
          <a
            className="gap-1 flex flex-col justify-between"
            href={office365Link}
            target="_blank"
            rel="noreferrer"
          >
            <Office365Icon />
            <span>Office 365</span>
          </a>
        </li>
        <li className="hover:bg-dark-borderCards/30 p-2 rounded-lg">
          <a
            className="gap-1 flex flex-col justify-between"
            href={yahooLink}
            target="_blank"
            rel="noreferrer"
          >
            <YahooIcon />
            <span>Yahoo</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
