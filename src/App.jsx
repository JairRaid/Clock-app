import { useContext } from "react";
import "./App.css";
import { ClockContext } from "./context/ClockContext";
import { formatTime24Hour } from "./utils/timeUtils";

const App = () => {
  const {
    quote,
    ipData,
    timeData,
    isExpanded,
    isDark,
    toggleClockDetails,
    getQuote,
  } = useContext(ClockContext);

  const handleToggle = () => toggleClockDetails();

  const { content, author } = quote || {};
  const {
    timezone,
    day_of_year,
    day_of_week,
    week_number,
    abbreviation,
    datetime,
  } = timeData || {};
  const { city, country } = ipData || {};

  const time24hour = formatTime24Hour(datetime);

  return (
    <main className="main-content">
      {/* <!-- Background image is decorative --> */}
      <picture>
        <source
          media="(min-width: 64rem)"
          srcSet={`${isDark ? "./bg-two-lg.webp" : "./bg-one-lg.webp"}`}
          width="2880"
          height="1600"
        />
        <source
          media="(min-width: 48rem)"
          srcSet={`${isDark ? "./bg-two-md.webp" : "./bg-one-md.webp"}`}
          width="1536"
          height="2048"
        />
        <img
          className="clock__background"
          src={`${isDark ? "./bg-two-sm.webp" : "./bg-one-sm.webp"}`}
          alt=""
          width="750"
          height="1334"
          aria-hidden="true"
        />
      </picture>

      {/* <!-- Clock Card --> */}
      <section className="clock" aria-labelledby="current-time-heading">
        {/* <!-- Overlay --> */}
        <div className="clock__overlay">
          {/* <!-- Quote --> */}
          {!isExpanded && (
            <aside className="quote" aria-labelledby="quote-heading">
              <h2 id="quote-heading" className="sr-only">
                Inspirational quote
              </h2>

              {quote && (
                <blockquote>
                  <p>{`“${content}”`}</p>

                  <footer>
                    <cite>{author}</cite>
                  </footer>
                </blockquote>
              )}

              <button
                className="quote__button"
                type="button"
                aria-label="Load another quote"
                onClick={getQuote}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.5"
                    d="M7.04297 9.9999C7.13384 9.99997 7.21614 10.0511 7.25098 10.1288C7.28556 10.2065 7.26619 10.2958 7.20215 10.3554L4.6709 12.5614C6.24643 13.9492 8.48412 14.4855 10.5889 13.9794C12.6939 13.4731 14.3678 11.9958 15.0146 10.0731L17.5918 10.8192C16.6596 13.59 14.2355 15.7113 11.1953 16.4169C8.15518 17.1223 4.93738 16.3104 2.7041 14.2743L0.384766 16.2958C0.320468 16.3555 0.222812 16.3739 0.138672 16.3417C0.0546279 16.3095 1.93258e-05 16.2326 0 16.1483V9.9999H7.04297ZM6.78613 0.253804C9.81883 -0.45577 13.0326 0.345438 15.2695 2.37001L17.6162 0.291889C17.6803 0.23245 17.7764 0.214168 17.8604 0.245991C17.9443 0.277863 17.9994 0.353359 18 0.437397V6.66689H10.9824C10.8914 6.66684 10.8092 6.61587 10.7744 6.53798C10.7396 6.46009 10.7588 6.36998 10.8232 6.31044L13.3203 4.09755C11.7436 2.71354 9.5066 2.18074 7.4043 2.68837C5.30208 3.19608 3.63129 4.67294 2.98535 6.59365L0.408203 5.84755C1.33787 3.0822 3.75363 0.963474 6.78613 0.253804Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </aside>
          )}

          {/* <!-- Current Time --> */}
          <section className="time" aria-labelledby="current-time-heading">
            <p className="time__period">
              <svg
                aria-hidden="true"
                focusable="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7809 19.4165C12.374 19.4165 12.863 19.8656 12.9256 20.4425L12.9323 20.568V22.4097C12.9323 23.0463 12.4169 23.5617 11.7809 23.5617C11.1873 23.5617 10.6987 23.1127 10.6361 22.5353L10.6294 22.4097V20.568C10.6294 19.932 11.1449 19.4165 11.7809 19.4165ZM6.38139 17.1809C6.79901 17.5975 6.82884 18.2562 6.47088 18.7078L6.38139 18.8082L5.07861 20.1115C4.62939 20.5607 3.9 20.5607 3.45026 20.1115C3.03265 19.6943 3.00327 19.0352 3.36087 18.5835L3.45026 18.4831L4.75304 17.1809C5.20278 16.7306 5.93165 16.7306 6.38139 17.1809ZM18.8082 17.1809L20.111 18.4837C20.5607 18.9323 20.5607 19.6623 20.111 20.1115C19.6612 20.5607 18.9323 20.5607 18.4826 20.1115L17.1798 18.8087C16.7301 18.359 16.7301 17.6301 17.1798 17.1809C17.6296 16.7317 18.359 16.7317 18.8082 17.1809ZM11.7809 5.87948C15.0344 5.87948 17.6823 8.52678 17.6823 11.7814C17.6823 15.036 15.0344 17.6833 11.7809 17.6833C8.52678 17.6833 5.87948 15.0355 5.87948 11.7814C5.87948 8.5273 8.52678 5.87948 11.7809 5.87948ZM22.4103 10.6294C23.0463 10.6294 23.5617 11.1449 23.5617 11.7809C23.5617 12.4169 23.0463 12.9318 22.4103 12.9318H20.568C19.932 12.9318 19.4165 12.4169 19.4165 11.7809C19.4165 11.1449 19.932 10.6294 20.568 10.6294H22.4103ZM2.99322 10.6294C3.62922 10.6294 4.1447 11.1449 4.1447 11.7809C4.1447 12.3745 3.69566 12.8626 3.11912 12.9251L2.99374 12.9318H1.15148C0.515478 12.9318 0 12.4169 0 11.7809C0 11.1873 0.449039 10.6987 1.026 10.6361L1.15148 10.6294H2.99322ZM4.97817 3.36129L5.07861 3.45078L6.38139 4.75304C6.83113 5.20278 6.83113 5.93165 6.38139 6.38139C5.96378 6.79949 5.30548 6.82936 4.85349 6.47098L4.75304 6.38139L3.45026 5.07861C3.00052 4.62939 3.00052 3.9 3.45026 3.45078C3.86788 3.03317 4.52617 3.00334 4.97817 3.36129ZM20.111 3.45026C20.5607 3.9 20.5607 4.62939 20.111 5.07861L18.8082 6.38139C18.359 6.83113 17.6301 6.83113 17.1798 6.38139C16.7306 5.93165 16.7306 5.20278 17.1798 4.75304L18.4826 3.45026C18.9318 3.00104 19.6612 3.00104 20.111 3.45026ZM11.7809 0C12.4169 0 12.9323 0.515478 12.9323 1.15148V2.99374C12.9323 3.62922 12.4163 4.1447 11.7809 4.1447C11.1449 4.1447 10.6294 3.62922 10.6294 2.99374V1.15148C10.6294 0.515478 11.1449 0 11.7809 0Z"
                  fill="white"
                />
              </svg>

              <span className="max-w-[12.8125rem] md:max-w-none overflow-x-hidden text-nowrap">
                {`${isDark ? "GOOD EVENING" : "GOOD MORNING"}`}, IT'S CURRENTLY
              </span>
            </p>

            <h1 id="current-time-heading">
              <time dateTime={time24hour} className="time__current">
                {time24hour}
              </time>

              <span className="time__timezone">{abbreviation}</span>
            </h1>

            <p className="time__location">
              IN
              <span>
                {" "}
                {city?.toUpperCase()}, {country}
              </span>
            </p>
          </section>

          {/* <!-- Expand Button --> */}
          <button
            className="clock__toggle"
            type="button"
            aria-expanded={isExpanded}
            aria-controls="clock-details"
            onClick={handleToggle}
          >
            <span>{isExpanded ? "LESS" : "MORE"}</span>

            <div className="clock__toggle-icon">
              <svg
                className={`clock__toggle-svg ${isExpanded ? "rotate-0" : "rotate-180"}`}
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.04102 7.5L6.99992 1.5L12.9588 7.5"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* <!-- Additional Information --> */}
      <section
        id="clock-details"
        className={`clock-details ${isExpanded ? "" : "hide"}`}
        aria-labelledby="details-heading"
        aria-hidden={!isExpanded}
      >
        <h2 id="details-heading" className="sr-only">
          Additional time information
        </h2>

        <dl className="details__list">
          <div className="details__item">
            <dt className="details__term">Current timezone</dt>
            <dd className="details__definition">{timezone}</dd>
          </div>

          <div className="details__item">
            <dt className="details__term">Day of the year</dt>
            <dd className="details__definition">{day_of_year}</dd>
          </div>

          <div className="details__item">
            <dt className="details__term">Day of the week</dt>
            <dd className="details__definition">{day_of_week}</dd>
          </div>

          <div className="details__item">
            <dt className="details__term">Week number</dt>
            <dd className="details__definition">{week_number}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default App;
