const Collapse = (): JSX.Element => {
  return (
    <div className="collapseContainer">
      <div className="collapse-title">Step 1: Draft your question</div>
      <div className="collapse-desc">
        The community is here to help you with specific coding, algorithm, or
        language problems. Avoid asking opinion-based questions.
      </div>
      <div className="collapse-desc">Avoid asking opinion-based questions.</div>
      <div className="wrap-collabsible">
        <input id="collapsible" className="toggle" type="checkbox" />
        <label htmlFor="collapsible" className="lbl-toggle">
          Summarize the problem
        </label>
        <div className="collapsible-content">
          <div className="content-inner">
            <ul>
              <li>Include details about your goal</li>
              <li>Describe expected and actual results</li>
              <li>Include any error messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collapse;
