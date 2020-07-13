import React, { useContext, useEffect, useState } from "react";

import "./styles.css";

import ItemsContext from "./itensContext";
interface Item {
  title: string;

  name: string;
  id: number;
  value: string;
}
interface Props {
  section: number;
  item: Item[];
}
const image =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAAD6+vr4+Pju7u7g4ODr6+vm5ub19fWBgYGpqany8vL8/PxNTU3AwMBvb28oKCiRkZHb29tpaWnOzs6vr6+VlZWKioq4uLhfX18wMDA2NjYUFBRkZGTS0tKenp55eXkODg5WVlZCQkIdHR2ioqJ9fX1JSUkaGhoyMjI9PT3w397mAAAMU0lEQVR4nO2d6ZaiOhCAB0QWBRHFfWnRXqb7/R/wGpAWMAmVpEJyz5nvt0KKLLWkUvnz5x//ABK77mgUesE48MLRyHVj0w3Cwg29fLWOTsm+cJoU38kpyiYzP3RNN1GeqT/L0oPTxyHNtsHUdGNFif082x2bchz3P8n1ujst0+Vpd73NO2Ied5vc/98MXC+Pvn6b/n4fjB/5YhxMW+2fjherz+t7W8zkkvumGg1nPDnV7T4sN7Oxx/uxt1hfu335MR6qqTIEH0ndHZ+rIAT9x9/uOiP2y1Yhp5OHePPL1hOaUv5bd1p+Tbh9b4Q8rRaWn/VCYvl3t7eOjMUpx2+kPPFkX/VetpB+xuynq0b2kxFiG1Xw1lWLPuXFK9l2RXScjQ1ra3Ap2/K9QtBmm1cZ00D9sUoEadmOpWL31Yz3rzIuTcrof5ZtiBDbQOlG52JqrLpZ+f41TO9ByQuKjBsja86qVA8Zus3sf1FEdFbYr+nlfNO21sVLmoi3s4ZXsQkj8tKTLusqoonofOJOBy4zYmXdZvpesKaKONf4xhZeqSE+tHpzdBGddBBztezAq27zn6Y1hunGmLy6GGBlu9BFdCLNkYAxWUKvg2jgK0PEm9bhMyOveNP5hifxO0NEZ6vvpWSEzpFM0H7GLAmdSNMbXeLDnwYMiK2YIn5paYVfDDdCH5yYIjoaloIzee7AkYURW0IH3YgjDvh8cC9mxhEReb15uz8yMbDD0I00NkGdMcSISjEfCIW9nt7J8N6zwX2c6KuZbLDeQpyZNdbDBPF5EmIpRiLgB86jJMj0i0jGyQTjQXLwOxFjoJJFZvggSYNPvojK68Ob0SFKWPAlVFUaRNGbWmRqWG5UjZLqP2MMA1Uo+xltFAw4MsuNKPp2K459Ikpbk+79zwlmWyXhmW4lhawzdfcH5zZku/QOU9l+2Kj0P4tYIhmKa5xWSKlF4rng+oPe5EISiA4X0V367hY4BYkoI/lwqP7JuBkfvAgFzOhR/jbCEbj4/t1Oon/i8dZpkYiW5TnCNTfR0X+fhHPEcM/odT9pCd9oAUxE4alIvhpi2NCl2SVX8Dodd/NtqAhNRW+OOwnpIfoL+P/UTdMuc5H1K71/YVEpOLDmEfirszYx2giYX6RFmJqwYDSpgD7gAyQh/IuFc1yXkB27hr4FspjemUMXrwh3jP5h5wkfgE/IYRJCgxrEZcLcwQo5TQJ+9DNQQqAjdUP26nmGM3Dm9Pn5v9wgT7vPmh/UrZ0Jp0XAEBdI5ZcAZvaowDa4GVkHJUDbLQBLWPSbERtke3RgCfuDLiRwgbxRzlNm6KO0X5FfEHcDHvBWGmCcDLzSOL224L0LC+ysHF7UGmg5gbVF/zNT/C7884ftGcyBT4Bq/BKueUpmNP4RJPZEhOpdoNX2gJfQm2qJcLvMtkA9RKDl/YDTiZ4DtqOEYJneYPMe5j39wl5JMl3JOPSthx34/wn1/0yYOpGMJj3pFiNKDr6zhydvg6IYDVij/25ALnEkeiF89aAO8CVNROGXsAyJPWr0qUN3Kl0E/iukLAh75nOgHqkM52Y4SSwvnZuQQYXuO6S6t7MX2YFslB0PogfAQKG2FlSF4RWOgyEHlzgYix+wCQphCamm50Rf3qYiYhZNBW2t+dK5zihBPWHSA2VHccxcgUzjMdOhebw6uR/mky4YyAxSmlGfoPv2WPRu41N5Gab3Qfpjovn9CBs0D7r9Ze8gFVf3Fd3VdGfrSjrtzaZh0IkYen/tSCx5pbs7Dua9rfRzMVN4OELZLuzappHWszYK8MLJPbQstPiL5/obpCd/lksStx+UWFn/JlWQsBWvyC21uoVd3xbNibixcxrCskyYNGPbO34Y1RSQbC8OjVjeXaseBjwKDkXO5H5yfMa6An1BNgU8RQGb43KrYz9GmZeSPMI8swQyqfxMzSgpioqs+TDrfEP+aSAYvxE399A1U80jttvE4FA7E6EdKflNeBkqAtQKwkNPv1AFScBfW9s6m03aJ+xS220T04e3OiiaMg3qSEY2+DF0HiO52BqVWl1ENsVoFmrWdpt68p0sUodYa0xFbYsmztESz8JHHKGEhxKM987ejjq+uB1457sKXLgFckKpJLn4Rmgfj2N7rhUmzZlTyESeymwbISeuy5AjT8CaKqHFuIThCn98tiQMRbKT8Knr82qhMkwNGt7BNi30iefUcQwzURp/NtHZeS0JxwMdSR/n29VkMnnLotOXftkqKltNfx/6q0wwuxCLqg/1zsNwK5gcqkFCjWtpuNKix+FUa6k2fXjGc2Vl0arxZ301SYagklCLXTrTZqYIUdmlGnyLhQ395/z6Fuj+4cj8/Hvw8A+xffwZZqRFjXr2LTHjNLE1Heg8LRnMWFugvieGSB1rQ4yXzgrTQrWo46V4MW/0UJIidcwbbd9CNo1QG/XQxDK9bVpjKuq9J6T9w57yfyao9w9x9oCtG6KNPWCUfXy0PT9EnqELhFyM/ppqBsiazVPMpxE5Tj4cz25TjtSMhoosifG0tpXz2jTF5BVp5LWp5ibaZso8aEaf1PJLBepyDErzwLOa3WaJQ/9C051QyvO2UlEQmnneKrn6I3tc+jbtPlM4b6FwIkIv7Xknf2aGHB+2k7ZXL3/uyUKDu6LrTMieXbt/Gkvpuryy5w9RMl210D1/KHmG1O2/WdwUL/6g3DlgtWM7OnmNWsgNU4SEek28Rg+lzuNPC9OCMKEMyERiNbXWYKOG1mTqYtg7SGlVWohxImh9h+L1HI7zQcIB9LJ64vVpBKMzt7dFTFi8AcrIq0FPEBKvMSRkdCfNskILzfk1jJ0m4TpRItOwOzzY5ZMRYGkF0VpfI/g0LF4X70WhT0JWrS/Rem1T+Ctp5pJsSQ8ATDdJsOYe3GSjR9RVT8EyYdehFaybCA4ifjIeoGs7jhOQEat9CT4EyfpqvErfCvByScXql0KTDtl7InoCBNzgtlANWmgsn+2VaVls+OnAQnWEgZYJ7wYEHRL2qIMLfDmF1nTg6VgN6aesZa1GoJ43+1rpNrzLTjTsHPdqdHhN9riAvZJXlRx/16r/IjxSVx+25R0D/aBBJTwCor7guxEwRin6lgBob+IGvCcIutLw0uSxN4+/IA2H31EC9WM5j0AWEHrZI/SeGWgHsF8rVC8fAFTRQe8KgqZ5sTUUcqIY+K4g6H1PYMubZSWp1CqjIZD2BLuzC7zUs6wameKyHETOp8HuXYPPIvqYRw7VCN27Brs7T8C9o8W+sHd1BFPzNoBbVl1atXzw67FjGKKZeaA7LEXO3WVtOynGqJLURPgOy9I57YtoCG0AH7bPNsRb9J1Vic1PwF2ygi76/DJb+FN/Mbvgp+BI5cf23wcskyxUYMtWIpke23+ns8kDsE1kE/Hj3v9qi+mKIX0vd//d6lOpgvDoKFwdQ6wW7hC3YpgK3QbShWzU83QGtvsjg2JtWaLyOMe+YvPHfZXvLSaRFI6zqHWjEwJCrXyiFtnhstBw/ixK3VWyB8YeqGZPAyFVQyQiMgeD0U5EK/dIBipzOBjMv0QsDUyWG6bqN5aAiXohB+mohGGjmjLdkOt1EtU/Z1hHyAElIOhF5Evrhe4vCmSd4KFkqtHxC4c19Icfp4WWexpjkot2ok7GobMwtV1VQaJHc+rwEIi6IaCxgHw5HGmmrnoNfAG01o8PyI7alZKwMlzS/k1zvdy4TPKhOBtDORkb/aVWc2KIXl8/5CAm+HyQGw68cuV8e/mWAxzTS4eqBjwjS+fPy+fU3YvDdGBFVevq1N2d0numOxr2opjq7tuoY1poNG7E7tdFYVsmDG3a25KoFdWbGLmsya02yLLW4JlqKa+wgV/hjYtX5VJELQsA3+e/6LkOHYZf2dzL5poz/kaVLzUpHyGoAvvfq4Z+ROzG1IaK/9OHqr88OzJEcqcyWy74iSeV9zR/Xik+Vg9t7Cem1hcq+aXKNv1ZLx7tWij1Y5FadG3Kg+nkcR7t/bLyykkZrGUDjcnKluHZIaiFdJLPVUD05DkSX1iTD2tuTKExXp1qs+aw3MyCMBy/7eCGzt+d3eJVTM/R8/zke7LcTLarz+vtMC/6Oi/KLR2cFPxztmsmuv/dH/bvR3bq+3G3yX0bLkoRYurP1mn/WnNIs21gxz03Urihd16to2Xy3R6jxXeyjLJJ7od2XpYtQRy7o5EfBOMg8EcjN/7fDcl/mOM/Zbu4Td7Ar7cAAAAASUVORK5CYII=";
const CheckBoxTextForm: React.FC<Props> = ({ section, item }) => {
  const { selectedItems, toggleSelectedItem } = useContext(ItemsContext);

  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    setItems(items);
  }, []);

  return (
    <ul className={"items-grid items-grid-disposition-1"}>
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => toggleSelectedItem(section, item.id)}
          className={
            selectedItems.includes({ section, id: item.id }) ? "selected" : ""
          }
        >
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default CheckBoxTextForm;
{
  /* <ul className="field-check-list">
<li className={`field-check ${name}`}>
  <input name="field-check-button" type="checkbox" id={id + 1} />
  <label htmlFor={name}>{title}</label>
</li>
<li className={`field-check ${name}`}>
  <input name="field-check-button" type="checkbox" id={id + 2} />
  <label htmlFor={name}>{title}</label>
</li>
<li className={`field-check ${name}`}>
  <input name="field-check-button" type="checkbox" id={id + 2} />
  <label htmlFor={name}>{title}</label>
</li>
</ul> */
}
