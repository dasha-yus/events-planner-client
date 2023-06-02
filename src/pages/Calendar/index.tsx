import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Calendar as FormikCalendar } from "primereact/calendar";

import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const procedures = [
    { name: "Общий массаж", price: 65 },
    { name: "Антицеллюлитный массаж", price: 45 },
    { name: "Массаж спины (женский)", price: 35 },
    { name: "Массаж спины (мужской)", price: 40 },
    { name: "Массаж камнями", price: 70 },
    { name: "Массаж спины + камни", price: 45 },
    { name: "ШВЗ", price: 20 },
    { name: "Другое" },
  ];
  const [events, setEvents] = useState([
    {
      id: 1,
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      procedure: procedures[0],
      title: "Some title",
    },
    {
      id: 2,
      start: moment().add(2, "hours").toDate(),
      end: moment().add(3, "hours").toDate(),
      procedure: procedures[0],
      title: "Some title",
    },
  ]);
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
    formik.setFieldValue("id", slotInfo.id);
    formik.setFieldValue("title", slotInfo.title);
    formik.setFieldValue("start", slotInfo.start);
    formik.setFieldValue("end", slotInfo.end);
    setAddEventModalOpen(true);
  };

  const submitNewEvent = () => {
    setAddEventModalOpen(false);
  };

  const onProcedureSelected = (e: any) => {
    formik.setFieldValue("procedure", e.value);
  };

  const formik: any = useFormik({
    initialValues: {
      id: "",
      title: "",
      procedure: null,
      start: "",
      end: "",
    },
    onSubmit: (data: any) => {
      console.log(data);
      const updatedEvents = events.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      });
      setEvents(updatedEvents);
    },
  });

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
        header="Редактировать запись"
        visible={addEventModalOpen}
        onHide={() => setAddEventModalOpen(false)}
        className="md:w-30rem"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 form-group">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-user" />
              <InputText
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Клиент"
                className="w-full"
              />
            </span>
          </div>
          <div className="mb-4">
            <Dropdown
              name="procedure"
              value={formik.values.procedure}
              onChange={onProcedureSelected}
              options={procedures}
              optionLabel="name"
              placeholder="Процедура"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <FormikCalendar
              name="start"
              value={formik.values.start}
              onChange={formik.handleChange}
              showTime
              hourFormat="24"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <FormikCalendar
              name="end"
              value={formik.values.end}
              onChange={formik.handleChange}
              showTime
              hourFormat="24"
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
        </form>
      </Dialog>
    </>
  );
};

export default CalendarPage;
