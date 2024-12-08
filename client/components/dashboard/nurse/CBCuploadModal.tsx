import React, { useState, ChangeEvent, FormEvent } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import API_BASE_URL from "@/utils/apiConfig";

// Define types for the result and error
interface CBCResult {
  Result: number;
  IDA: number;
  FDA: number;
  Thalassemia: number;
  MPDs: number;
  HA: number;
  MA: number;
  MiA: number;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function CBCuploadModal({id}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [gender, setGender] = useState<number>(0);
  const [hema, setHema] = useState<string | null>(null);
  const [mch, setMch] = useState<string | null>(null);
  const [mchc, setMchc] = useState<string | null>(null);
  const [mcv, setMcv] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CBCResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hema === null || mch === null || mchc === null || mcv === null) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    const parsedData = {
      Gender: parseInt(gender.toString()),
      Hemoglobin: parseFloat(hema),
      MCH: parseFloat(mch),
      MCHC: parseFloat(mchc),
      MCV: parseFloat(mcv),
    };

    if (
      isNaN(parsedData.Gender) ||
      isNaN(parsedData.Hemoglobin) ||
      isNaN(parsedData.MCH) ||
      isNaN(parsedData.MCHC) ||
      isNaN(parsedData.MCV)
    ) {
      setError("Please ensure all fields have valid numerical values.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<CBCResult>(
        "http://127.0.0.1:8003/classify",
        parsedData
      );
      setLoading(false);
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      setLoading(false);
      setError("An error occurred while submitting the data.");
    }
  };

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(result);
    const form={
      testId: id,
      gender: gender,
      hemoglobin: hema,
      MCH: mch,
      MCHC: mchc,
      MCV: mcv,
      result: result,
    }
    
    const res = await axios.post(`${API_BASE_URL}/testReports/cbc/create`, form);
    console.log(res.data);
    const resStatus=await axios.put(`${API_BASE_URL}/testappointments/${id}`, {status: "completed"});
    console.log(resStatus.data);
    setLoading(false);
    
  };

  return (
    <div>
      <Button 
        onClick={handleOpen} 
        className="bg-ablue m-4 text-white hover:text-black"
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: '#0056b3',
            color: 'white',
          },
        }}
      >
        Upload CBC
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2} textAlign="center">
            CBC Classification
          </Typography>
          <form onSubmit={handleSubmit}>
            <label>
              Gender:
              <select
                name="Gender"
                value={gender}
                className="w-full rounded-md px-3 py-2 border-2 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setGender(parseInt(e.target.value))}
              >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
              </select>
            </label>
            <label>
              Hemoglobin:
              <input
                type="number"
                step="0.01"
                value={hema || ''}
                className="w-full rounded-md px-3 py-2 border-2 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setHema(e.target.value)}
              />
            </label>
            <label>
              MCH:
              <input
                type="number"
                step="0.01"
                value={mch || ''}
                className="w-full rounded-md px-3 py-2 border-2 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMch(e.target.value)}
              />
            </label>
            <label>
              MCHC:
              <input
                type="number"
                step="0.01"
                value={mchc || ''}
                className="w-full rounded-md px-3 py-2 border-2 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMchc(e.target.value)}
              />
            </label>
            <label>
              MCV:
              <input
                type="number"
                value={mcv || ''}
                step="0.01"
                className="w-full rounded-md px-3 py-2 border-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMcv(e.target.value)}
              />
            </label>
            {!result &&<Button 
              type="submit"
              sx={{
                marginTop: 2,
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              {loading ? "Loading..." : "Classify"}
            </Button>}
            {result && <Button 
              onClick={handleClick}
              sx={{
                marginTop: 2,
                display: 'block',
                width: '100%',
                borderRadius: '8px',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0056b3',
                },
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
            }
            {loading && <p>Loading...</p>}
            {result && (
              <>
                <p>
                  <span className="font-bold">Anemia: </span>
                  {result.Result === 1 ? "Detected" : "Not Detected"}
                </p>
                {result.Result === 1 && (
                  <>
                    <p>
                      <span className="font-bold">Iron Deficiency: </span>
                      {result.IDA === 1 ? "Detected" : "Not Detected"}
                    </p>
                    <p>
                      <span className="font-bold">Folate Deficiency: </span>
                      {result.FDA === 1 ? "Detected" : "Not Detected"}
                    </p>
                    <p>
                      <span className="font-bold">Thalassemia: </span>
                      {result.Thalassemia === 1 ? "Detected" : "Not Detected"}
                    </p>
                    <p>
                      <span className="font-bold">MPDs: </span>
                      {result.MPDs === 1 ? "Detected" : "Not Detected"}
                    </p>
                    <p>
                      <span className="font-bold">HA: </span>
                      {result.HA === 1 ? "Detected" : "Not Detected"}
                    </p>
                    <p>
                      <span className="font-bold">MA: </span>
                      {result.MA === 1 ? "Detected" : "Not Detected"}
                    </p>
                    <p>
                      <span className="font-bold">MiA: </span>
                      {result.MiA === 1 ? "Detected" : "Not Detected"}
                    </p>
                  </>
                )}
              </>
            )}
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </Box>
      </Modal>
    </div>
  );
}
