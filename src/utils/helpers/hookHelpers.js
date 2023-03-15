import { useEffect } from "react";

const useAddEventListeners = (configs) => {
  useEffect(() => {
    configs.forEach((config) => {
      if (typeof config.class == "string") {
        const elements = document.querySelectorAll(config.class);
        elements.forEach((element) => {
          element.addEventListener(config.event, config.handler);
        });
      } else {
        const element = config.class;
        element.addEventListener(config.event, config.handler);
      }
    });

    return (() => {
      configs.forEach((config) => {
        if (typeof config.class == "string") {
          const elements = document.querySelectorAll(config.class);
          elements.forEach((element) => {
            element.removeEventListener(config.event, config.handler);
          });
        } else {
          const element = config.class;
          if(element) element.removeEventListener(config.event, config.handler);
        }
      });
    });
  });
}

export { useAddEventListeners }
