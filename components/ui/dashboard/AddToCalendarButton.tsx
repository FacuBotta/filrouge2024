'use client';

import { GoogleCalendarIcon } from '@/public/images/icons/GoogleCalendarIcon';
import { Office365Icon } from '@/public/images/icons/Office365Icon';
import { OutlookIcon } from '@/public/images/icons/OutlookIcon';
import { YahooIcon } from '@/public/images/icons/YahooIcon';
import { EventWithUserAndCount } from '@/types/types';
import {
  CalendarEvent,
  google,
  office365,
  outlook,
  yahoo,
} from 'calendar-link';
import React, { useState } from 'react';

interface AddToCalendarButtonProps {
  className?: string;
  event: EventWithUserAndCount;
}

export default function AddToCalendarButton({
  className,
  event,
}: AddToCalendarButtonProps): React.ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen((prevOpen) => !prevOpen);
  };
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
    <div className="flex flex-wrap gap-2 items-start ">
      <button className={`primary-btn  ${className}`} onClick={toggleDialog}>
        Add to Calendar
      </button>

      {open && (
        <div className="flex border border-black dark:border-dark-grey rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out">
          <ul className="flex flex-wrap text-center text-xs">
            <li className="hover:bg-dark-borderCards/30 p-2">
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
            <li className="hover:bg-dark-borderCards/30 p-2">
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
            <li className="hover:bg-dark-borderCards/30 p-2">
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
            <li className="hover:bg-dark-borderCards/30 p-2">
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
      )}
    </div>
  );
}
