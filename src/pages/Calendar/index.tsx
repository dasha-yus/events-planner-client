import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Some title",
    },
  ]);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const procedures = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const minTime = new Date();
  minTime.setHours(9, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 30, 0);

  const onAddNewEvent = (slotInfo: any) => {
    console.log(slotInfo);
    setAddEventModalOpen(true);
  };

  const onUpdateEvent = (slotInfo: any) => {
    console.log("onUpdateEvent", slotInfo);
    setAddEventModalOpen(true);
  };

  const submitNewEvent = () => {
    setAddEventModalOpen(false);
  };

  return (
    <>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          selectable
          views={["day", "week", "month"]}
          style={{ height: "75vh" }}
          min={minTime}
          max={maxTime}
          onSelectEvent={(slotInfo) => onUpdateEvent(slotInfo)}
          onSelectSlot={(slotInfo) => onAddNewEvent(slotInfo)}
          messages={{
            next: "Следующий",
            previous: "Предыдущий",
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День",
            work_week: "Рабочая неделя",
            allDay: "Весь день",
            yesterday: "Вчера",
            tomorrow: "Завтра",
            noEventsInRange:
              "Не найдено никаких мероприятий в текущем периоде.",
            showMore: function showMore(total) {
              return "+" + total + "событий";
            },
          }}
        />
      </div>
      <Dialog
        header="Новая запись"
        visible={addEventModalOpen}
        onHide={() => setAddEventModalOpen(false)}
        className="md:w-30rem"
      >
        <div className="mb-4">
          <Dropdown
            value={selectedProcedure}
            onChange={(e) => setSelectedProcedure(e.value)}
            options={procedures}
            optionLabel="name"
            placeholder="Процедура"
            className="w-full"
          />
        </div>
        <div className="flex-end">
          <Button
            label="Отмена"
            severity="secondary"
            raised
            onClick={() => setAddEventModalOpen(false)}
            className="mr-2"
          />
          <Button label="Готово" raised onClick={submitNewEvent} />
        </div>
      </Dialog>
    </>
  );
};

export default CalendarPage;
