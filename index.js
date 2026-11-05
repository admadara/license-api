const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD0Xj4oBherDRFt
PniHQIUf24a/Um1mZ5oWllIxkBsT3mDuFqVpj7//kNOGg5bU7tA1p581Bk5ByJrt
cZ6P4+OtsC392XF5GdnDlQ5nd42dwA09HNmkIfjDC0Rl5Fp4VtJu38f8PFGIW6iR
RDL21Jcnqvm6mpYUe3Q6CU+llZhGmDHrgUH3CqWOqTIOlTtyaxRypgP9V5Mw5YQt
uCxjKnVqVkvI23W+vw5vs/kNW1VuNe5fYDI1fBEH0QHOnoHtWAJI5QrYbMKW2d6l
wRVFQCJMgGB1VCpy4hndPb5SKAjGurq/gs7tDyNR+wnnsp04pY3xVEYs8gWebeB8
NKLH3IdBAgMBAAECggEABkqoSFQF1BRBTih+wAhTFSByd8BGmE2GqMCEi7zVcaP2
9Di8vm4vNMRU3RPL9GrUptKZKJ6Wfh7ND48U4WJuIeWIfZtvKD2YS+ItbYNx79PH
LRTHo4nBxtXMreBP/8t7RG1tdirtNEW13jQDdhombSTiCqINxw4gDmZGEnH6t0CJ
g6zkcT5q97AP3Wv2M4dVfYK/Ttkc5uTxMYsy7OtosDhYyj3DTTPNgd3y8nSY/CEb
dVnKKdZN6YIlkkgdTMOdqwolwqjlX1W108+YZSt2330jl09leYcqh2VHWBXq0Wf8
FNiYvN8Pzv/9/E6HwQFXgiAl82zd3Myz8rbLM2Z/dQKBgQD/9g6Qf2iGvYaApYWE
2qrNw2PhN2zVGKEwHqEmryv1L8lOhN+peCgUsb99j2eq4kK0pXnaoanDdp+0PbZW
3YV3M29QW62E/HvN8bcmYulyT4YwWxmClY3oOxNnxBdMY7E49rE/GTlasjD17sqU
k3af6vtq4Q6YQhiVmhYEhlEVHQKBgQD0Z7xNwNfGADdqy81unp5XeREc+Hsrc5I6
uWyI5dIICLDt+WoFhh7j0s69mDEucBx2zmmHoTkXbMllG7UgMcwPYWB1LJgIM5L3
mTRE1lQplss/6VkGMth9f3OLD+VIlc0iC9XdjptKy7YdPgyQzlhHO1sooXY5F3V0
95DpflSVdQKBgEpz0SK43Less04CV4cgb+RwPEJLc+28P06W6jstYvTr1HtxbPmH
iOkUFuY362iqbcrMA1jUA2RmweeUt9AmmWbl4DAYqq1vH7f04lhZFxx4A0lXhmEU
jXWKkYdyY3CF4wv1vfLjrGo0QMeYkPaMukmj+UPKeQtS1oHVkyf3xegFAoGBAKH5
MdFx0U5WjGOJp579HkEoahACGVblo+6pPmXHsZdDc0ZzejEo/sXLytnZyBZXlHWk
PEn3rid5IEuSvkoU1oEG7u8Y27TrwSW4ceyBAowBdLfphOdXwSQC2Gc75J9jL+y1
XUoVHZPHR+0/VwKMzfJ/Qt29i+UwR9Z5z57+6z2VAoGBANaNF70dBwkFKMWAXZ7E
CjGRFxdH4VjvxKAd2fccX7oqxx9lxH4mc4XOysl5qZ1q3Ecuc5z/Ymz1guH8v1ss
CR6bDLQQFLSkFRU/Br2nzKxzXK5sZJQu2ssaVk7ypnCfPG1yThXdwYWsq/njAmMt
Ee6FHDUgm6MfX184XuXZqpU3
-----END PRIVATE KEY-----`;

// Lưu keys tạm trong memory (thay bằng database sau)
const validKeys = new Map([['FREE2026', { redeemedAt: Date.now() }]]);

app.get('/', (req, res) => {
  res.json({ status: 'License API running' });
});

app.get('/v1/policy', (req, res) => {
  res.json({ status: 'ok', policy: 'standard' });
});

app.get('/v1/policy', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/v1/license/check', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'Missing key' });
  const valid = validKeys.has(key);
  res.json({ valid, authorized: valid });
});

app.post('/v1/license/redeem', (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'Missing key' });
  validKeys.set(key, { redeemedAt: Date.now() });
  res.json({ success: true, message: 'Key redeemed' });
});

app.get('/v1/commerce/', (req, res) => {
  res.json({ status: 'ok', items: [] });
});

app.get('/update.json', (req, res) => {
  res.json({ version: '1.0.0', url: '' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
