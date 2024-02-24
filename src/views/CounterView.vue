<script setup lang="ts">
import { onMounted, ref } from "vue";

// Import the contract factory -- you can find the name in index.ts.
// You can also do command + space and the compiler will suggest the correct name.
import { CounterContractV4Abi__factory } from '@/contracts'

// The address of the contract deployed the Fuel testnet
const CONTRACT_ID =
    "0x6a0b24f7d9294deef3d33a39b3d5fdc10204f5c6b67d9eb63f1a3f50fa3a94fd";

const connected = ref(false);
const account = ref("");
const counter = ref(0);
const loaded = ref(false);

async function checkConnection() {
    if (window.fuel) {
        const isConnected = await window.fuel.isConnected();
        if (isConnected) {
            const [acc] = await window.fuel.accounts();
            account.value = acc;
            connected.value = true;
            getCount();
        }
    }
}

async function connect() {
    if (window.fuel) {
        try {
            await window.fuel.connect();
            const [acc] = await window.fuel.accounts();
            account.value = acc;
            connected.value = true;
            getCount();
        } catch (err) {
            console.log("Error connecting: ", err);
        }
    }
}

async function disconnect() {
    if (window.fuel) {
        try {
            await window.fuel.disconnect();
            const [acc] = await window.fuel.accounts();
            account.value = acc;
            connected.value = false;
        } catch (err) {
            console.log("Error disconnecting: ", err);
        }
    }
}

onMounted(async () => {
    setTimeout(async () => {
        await checkConnection();
        loaded.value = true;
    }, 200);
})

async function getCount() {
    if (window.fuel) {
        const wallet = await window.fuel.getWallet(account.value);
        const contract = CounterContractV4Abi__factory.connect(CONTRACT_ID, wallet);
        const { value } = await contract.functions.count().simulate();
        counter.value = value.toNumber();
    }
}

async function increment() {
    if (window.fuel) {
        const wallet = await window.fuel.getWallet(account.value);
        const contract = CounterContractV4Abi__factory.connect(CONTRACT_ID, wallet);
        // Creates a transactions to call the increment function
        // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
        try {
            await contract.functions.increment().txParams({ gasPrice: 1 }).call();
            getCount();
        } catch (err) {
            console.log("error sending transaction...", err);
        }
    }
}
</script>

<template>
    <div v-if="loaded" class="counter">
        <button v-if="connected" class="button-style" @click="increment">Increment</button>
        <button v-else class="button-style" @click="connect">Connect</button>
        <a href="/counter" @click.prevent="disconnect" class="disconnect-button">Disconnect</a>
        <h3 v-if="connected">Counter: {{ counter }}</h3>
    </div>
</template>

<style scoped>
.button-style {
    border-radius: 48px;
    margin-top: 10px;
    background-color: #03ffc8;
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, .88);
    border: none;
    outline: none;
    height: 60px;
    width: 400px;
    cursor: pointer;
}
</style>