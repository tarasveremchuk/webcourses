import React from 'react';

const PreFooterSection = () => {
  return (
    <section className="pre-footer-section">
      <div className="pre-footer-content">
        <div className="image-wrapper">
          <img src={process.env.PUBLIC_URL + "/images/object_1.png"} alt="Main Image" className="main-image" />
          <img src={process.env.PUBLIC_URL + "/images/Group(1).png"} alt="Small Image 1" className="small-image img1" />
          <img src={process.env.PUBLIC_URL + "/images/Group(2).png"} alt="Small Image 2" className="small-image img2" />
          <img src={process.env.PUBLIC_URL + "/images/Group(3).png"} alt="Small Image 3" className="small-image img3" />
          <img src={process.env.PUBLIC_URL + "/images/Group(4).png"} alt="Small Image 4" className="small-image img4" />
          <img src={process.env.PUBLIC_URL + "/images/Group(5).png"} alt="Small Image 5" className="small-image img5" />
          <img src={process.env.PUBLIC_URL + "/images/Group(6).png"} alt="Small Image 6" className="small-image img6" />
        </div>

        <div className="text-content">
          <h2 className="info-title-block">
            Преміум <span className="learning">курси і</span> <br />
            досвід
          </h2>

          <div className="image-with-text-container">
            <div className="image-with-text">
              <div className="outer-image">
                <img src={process.env.PUBLIC_URL + "/images/Rectangle 41(1).png"} alt="Outer Photo" className="outer-photo" />
                <img src={process.env.PUBLIC_URL + "/images/hearts 1.png"} alt="Inner Photo" className="inner-photo" />
              </div>
              <div className="text-beside-images">
                <h1 className="righttext-image">Легкодоступність</h1>
                <p>Наші послуги доступні для вас у будь-який час та будь-де.</p>
              </div>
            </div>

            <div className="image-with-text2">
              <div className="outer-image2">
                <img src={process.env.PUBLIC_URL + "/images/Rectangle 41(1).png"} alt="Outer Photo" className="outer-photo2" />
                <img src={process.env.PUBLIC_URL + "/images/jigsaw 1.png"} alt="Inner Photo" className="inner-photo2" />
              </div>
              <div className="text-beside-images">
                <h1 className="righttext-image">Зручність</h1>
                <p className="righttext-h">Зручне навчання з нами для вашого успіху.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterSection;
