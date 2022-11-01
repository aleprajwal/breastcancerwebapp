import "../css/FeatureForm.css"
import React, { useState, useRef, useEffect } from "react";

const FeatureForm = () => {
  const [formData, setFormData] = useState({
    clump_thickness: "",
    cellsize: "",
    cellshape: "",
    marginal_adhesion: "",
    epithelial_cellsize: "",
    bare_nuclei: "",
    bland_chromatin: "",
    normal_nucleoli: "",
    mitoses_value: "",
  });

  const [result, setResult] = useState("");

  const clumpRef = useRef();

  useEffect(() => {
    clumpRef.current.focus();
  }, []);

  const myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tumorData = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clump: formData.clump_thickness,
          uniformitysize: formData.cellsize,
          uniformityshape: formData.cellshape,
          adhesion: formData.marginal_adhesion,
          epithelialcell: formData.epithelial_cellsize,
          nuclei: formData.bare_nuclei,
          chromatin: formData.bland_chromatin,
          nucleoli: formData.normal_nucleoli,
        }),
      };

      // add this line on package.json "proxy": "http://127.0.0.1:5000/", to request api locally
      //first api request send somekind of non json format response therefore, need to put then and change response to json format
      // https://prajwal-breastcancerclassifier.herokuapp.com
      let res = await fetch("https://prajwal-breastcancerclassifier.herokuapp.com/classifier", tumorData).then((response) => response.json());
      // console.log(res);
      setResult(res.Message);
      // console.log(res.Message, res.Result)

      /*
      if (res.Status === 200) {
        setFormData({
          clump_thickness: '',
          cellsize: '',
          cellshape: '',
          marginal_adhesion: '',
          epithelial_cellsize: '',
          bare_nuclei: '',
          bland_chromatin: '',
          normal_nucleoli: '',
          mitoses_value: ''
        });
      }
      */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark-mode">
      <h1>Breast Cancer Classification</h1>
      <section>
        <h2>Tumor Features</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="clump_thickness"> Clump Thickness: </label>
            <input
              type="number"
              min="1"
              max="10"
              ref={clumpRef}
              id="clump_thickness"
              name="clump_thickness"
              placeholder="Clump Thickness Value"
              value={formData.clump_thickness}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="cellsize"> Uniformity of Cell Size: </label>
            <input
              type="number"
              min="1"
              max="10"
              id="cellsize"
              name="cellsize"
              placeholder="Uniformity of Cell Size Value"
              value={formData.cellsize}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="cellshape"> Uniformity of Cell Shape: </label>
            <input
              type="number"
              min="1"
              max="10"
              id="cellshape"
              name="cellshape"
              placeholder="Uniformity of Cell Shape Value"
              value={formData.cellshape}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="marginal_adhesion"> Marginal Adhesion: </label>
            <input
              type="number"
              min="1"
              max="10"
              id="marginal_adhesion"
              name="marginal_adhesion"
              placeholder="Marginal Adhesion Value"
              value={formData.marginal_adhesion}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="epithelial_cellsize">
              {" "}
              Single Epithelial Cell Size:{" "}
            </label>
            <input
              type="number"
              min="1"
              max="10"
              id="epithelial_cellsize"
              name="epithelial_cellsize"
              placeholder="Single Epithelial Cell Size Value"
              value={formData.epithelial_cellsize}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="bare_nuclei"> Bare Nuclei: </label>
            <input
              type="number"
              min="1"
              max="10"
              id="bare_nuclei"
              name="bare_nuclei"
              placeholder="Bare Nuclei Value"
              value={formData.bare_nuclei}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="uniformity"> Bland Chromatin: </label>
            <input
              type="number"
              min="1"
              max="10"
              id="bland_chromatin"
              name="bland_chromatin"
              placeholder="Bland Chromatin Value"
              value={formData.bland_chromatin}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="normal_nucleoli"> Normal Nucleoli </label>
            <input
              type="number"
              min="1"
              max="10"
              id="normal_nucleoli"
              name="normal_nucleoli"
              placeholder="Normal Nucleoli Value"
              value={formData.normal_nucleoli}
              onChange={myChangeHandler}
              required
            />
          </div>
          <div>
            <label htmlFor="mitoses_value"> Mitoses: </label>
            <input
              type="number"
              min="1"
              max="10"
              id="mitoses_value"
              name="mitoses_value"
              placeholder="Mitoses Value"
              value={formData.mitoses_value}
              onChange={myChangeHandler}
              required
            />
          </div>

          <button type="submit"> Submit </button>
        </form>
      </section>
      <footer>
        <h2>Result shows tumor characteristic as: {result} </h2>
      </footer>
    </div>
  );
};

export default FeatureForm;
