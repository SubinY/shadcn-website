// 导入模块
const { RunModel } = require("../models");

type KeepLoginType = {
  ok: Boolean;
  data: {
    token: String;
  };
  errorCode: String;
};

let cachedToken: string | null =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NjhiYzMxZDk0ZmU3ZjAwMDFhYzBjZWYiLCJ1c2VybmFtZSI6IuWBtuWwlOW-iOW_meeahF9LZWVwZXIwNHh2IiwiYXZhdGFyIjoiaHR0cHM6Ly9zdGF0aWMxLmtlZXBjZG4uY29tL2F2YXRhci8yMDI0LzA3LzA4LzE4L2JmMWU0NjE1ZWIwZjYzZjM1ZTkyMGQxMWNhYjM0NTMzZmI5MjY5MDMuanBnIiwiX3YiOiIxIiwiX2VkIjoieU1FcXBvUzc0WHQ1elpTTUlDc2RNZz09IiwiZ2VuZGVyIjoiTSIsImRldmljZUlkIjoiIiwiaXNzIjoiaHR0cHM6Ly93d3cuZ290b2tlZXAuY29tLyIsImV4cCI6MTc1Mzc3NTAzNSwiaWF0IjoxNzMwNDQ3MDM1fQ.q5TE8sjBLcD-rDbT7JsxiT9-29vYK0cCj3BH92DEwx4";
let tokenExpiry: number | null = null;

const LOGIN_API = "https://api.gotokeep.com/v1.1/users/login";
const RUN_DATA_API = "https://api.gotokeep.com/pd/v3/stats/detail";
const RUN_LOG_API = "https://api.gotokeep.com/pd/v3/{sport_type}log/{run_id}";

function clearCache() {
  cachedToken = null;
}

async function keepLogin(): Promise<string | null> {
  if (cachedToken) {
    return cachedToken;
  }

  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
      "Content-Type": "application/json",
    };
    const data = { mobile: "15815828124", password: "Aa12345678" };
    const res = await fetch(LOGIN_API, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result: KeepLoginType = await res.json();
    if (result.ok === true) {
      cachedToken = result.data.token as string;
      return result.data.token as string;
    }
    clearCache();
    return null;
  } catch (error) {
    console.log("keepLogin error", error);
    clearCache();
    return null;
  }
}

export const findRunData = async () => {
  const token = await keepLogin();
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const runRes = await fetch(
      RUN_DATA_API + `?dateUnit=all&type=running&lastDate=1730421480110`,
      {
        method: "GET",
        headers,
      }
    );
    const runResult = await runRes.json();
    if (runResult.ok === true) {
      const records = runResult.data?.records?.map((item: any) => ({
        startTime: item.logs[0]?.stats?.startTime,
        endTime: item.logs[0]?.stats?.endTime,
        duration: item.logs[0]?.stats?.duration,
        kilometre: item.logs[0]?.stats?.distance,
        nameSuffix: item.logs[0]?.stats?.nameSuffix,
        amapWaterMark: item.logs[0]?.stats?.amapWaterMark,
      }));

      return records;
    }
    // const data = await RunModel.findAll();
    // if (data.length === 0) return [];
    // const result = data.map((d: any) => {
    //   d.toJSON();
    // });
  } catch (error) {
    console.log("findRunData error", error);
  }
};
