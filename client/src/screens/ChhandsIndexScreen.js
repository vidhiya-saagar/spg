import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import { fetchGet } from '../helpers/fetchHelper';
import ChapterStyles from '../stylesheets/components/ChapterStyles.module.css';
import AddChhand from '../components/AddChhand';
const ChhandsIndexScreen = () => {
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    const fetchAllChapters = async () => {
      const res = await fetchGet('/chhands-screen');
      setChapters(res.chapters);
    };
    fetchAllChapters();
  }, []);
  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>Chhands</h1>
          <p className='subtitle'>
            All Chhands for All Chapters{' '}
            <span className='bold'>(Only Book 1 for now...)</span>
          </p>
        </Grid>

        <Grid column={true} sm={12} md={10} lg={10}>
          {chapters &&
            chapters.map((chapter) => {
              return (
                <div key={chapter.id}>
                  <h1 className={ChapterStyles.ChapterTitle}>
                    <Link to={`/chapters/${chapter.id}`}>
                      Chapter {chapter.number}:{' '}
                    </Link>
                    {chapter.title_unicode}
                  </h1>

                  <table className='mtop15'>
                    <thead>
                      <tr>
                        <td>id</td>
                        <td>Chhand Type ID</td>
                        <td>Chhand Name</td>
                        <td>Order Number</td>
                        <td>First Pauri Tuk</td>
                        <td>Last Pauri #</td>
                      </tr>
                    </thead>
                    <tbody>
                      {chapter.chhands &&
                        chapter.chhands.map((chhand) => {
                          return (
                            <tr key={chhand.id}>
                              <td>{chhand.id}</td>
                              <td>{chhand.chhand_type_id}</td>
                              <td>{chhand.chhand_name_english}</td>
                              <td>{chhand.order_number}</td>
                              <td>{chhand.first_tuk.content_unicode}</td>
                              <td>{chhand.last_pauri.signature_unicode}</td>
                              <td></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              );
            })}
        </Grid>
        <AddChhand />
      </Grid>
    </>
  );
};

export default ChhandsIndexScreen;
