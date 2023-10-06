/* eslint-disable no-prototype-builtins */
import { EVENT_TYPE } from '@constants/codeConstants';
import { CreateFormVerifyNice } from 'interface';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export function getInfoEvent(eventType?: string) {
  const event = {
    title: '',
    filter: {
      eventTypes: '',
    },
  };
  switch (eventType) {
    case EVENT_TYPE.CONCERT:
      event.title = 'concert';
      event.filter.eventTypes = EVENT_TYPE.CONCERT;
      break;
    case EVENT_TYPE.SPORT:
      event.title = 'sport';
      event.filter.eventTypes = EVENT_TYPE.SPORT;
      break;
    case EVENT_TYPE.FREEMARKET:
      event.title = 'clearance';
      event.filter.eventTypes = EVENT_TYPE.FREEMARKET;
      break;
    case EVENT_TYPE.ART_GALLERY:
      event.title = 'art';
      event.filter.eventTypes = EVENT_TYPE.ART_GALLERY;
      break;
    default:
      event.title = 'other';
      event.filter.eventTypes = EVENT_TYPE.OTHER;
  }
  return event;
}

export const titleCase = (s: string) => {
  return String(s || '')?.replace(/^_*(.)|_+(.)/g, (_, c, d: string) =>
    c ? c?.toUpperCase() : ` ${String(d)?.toUpperCase()}`
  );
};

export const checkEventDate = (eventDate?: any) => {
  const performanceTime = dayjs(eventDate);
  const now = dayjs();
  return performanceTime.diff(now, 'day') < 5;
};

export const camelCaseToLabel = (key: string) => {
  return (key || '')
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join(' ');
};

export const snakeCaseToLabel = (key: string) => {
  return (key || '').replace(/(_)/g, (k) => {
    return ' ';
  });
};

export function handleConvertData(inputData: any) {
  if (inputData) {
    const result = inputData.map((item: any) => ({
      voucher: item.voucher,
    }));
    return result;
  }
  return [];
}
export const createAndSubmitFormVerifyNice = (data: CreateFormVerifyNice) => {
  // Create a form element
  const form = document.createElement('form');
  form.setAttribute('name', 'myForm');
  form.setAttribute('id', 'myForm');
  form.setAttribute(
    'action',
    'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
  );
  form.setAttribute('method', 'post');

  // Create input elements and fill them with data
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', key);
      const keyName = key as keyof typeof data;
      input.value = data[keyName];
      form.appendChild(input);
    }
  }

  // Create a submit button and click it
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  form.appendChild(submitButton);

  // Add the form to the DOM
  const formContainer = document.getElementById('form-container');
  if (formContainer !== null) {
    formContainer.style.display = 'none';
    formContainer?.appendChild(form);
  }

  // Submit the form
  form.submit();
};
export function isURL(str: string) {
  const urlPattern =
    /^(http(s)?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})(\/[^\s]*)?$/;

  return urlPattern.test(str);
}
