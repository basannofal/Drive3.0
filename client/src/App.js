import './App.css';
import { useState, useEffect } from 'react';
import {  ethers } from 'ethers';
import DriveAbi from './contracts/Drive.sol/Drive.json';
import FileUpload from './component/FileUpload';
import Display from './component/Display';
import Model from './component/Model';


function App() {
  const [account, setAccount] = useState("");
  const [drive, setDrive] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = '0x84820c88bafb61bbd12d4ed73b099a57858d9ad5';
      try {
        const { ethereum } = window;
        if (ethereum) {
          await ethereum.request({ method: 'eth_requestAccounts' });

          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });

          window.ethereum.on('accountsChanged', () => {
            window.location.reload();
          });

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          const contract = new ethers.Contract(contractAddress, DriveAbi.abi, signer);
          setDrive({
            provider: provider,
            signer: signer,
            contract: contract,
          });
        } else {
          console.log('Please install MetaMask');
        }
      } catch (err) {
        console.log(err);
      }
    };
    connectWallet();
  }, []);

  

  return <>
   {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Model setModalOpen={setModalOpen} contract={drive.contract}></Model>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={drive.provider}
          contract={drive.contract}
        ></FileUpload>
        <Display contract={drive.contract} account={account}></Display>
      </div>
  </>;
}

export default App;
