// Guest Name Lookup Module - personalizes the confirmed page's greeting by
// looking up a guest's display name from the public "Sheet2" guest list
// (column C), e.g. /confirmed?guest=7 -> row 7's column C.
const GUEST_SHEET_ID = '1dWP4UkKVwPczm_n35fifOTY0_2CWGPpc74XoX3IAoaY';
const GUEST_SHEET_GID = '1574996249';

function parseCsvLine(line) {
    const fields = [];
    let cur = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
            if (ch === '"') {
                if (line[i + 1] === '"') {
                    cur += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                cur += ch;
            }
        } else if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            fields.push(cur);
            cur = '';
        } else {
            cur += ch;
        }
    }
    fields.push(cur);
    return fields;
}

async function fetchGuestName(rowNumber) {
    const url = `https://docs.google.com/spreadsheets/d/${GUEST_SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GUEST_SHEET_GID}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const text = await res.text();
    const lines = text.split('\n').filter((line) => line.length > 0);
    const line = lines[rowNumber - 1];
    if (!line) return null;

    const name = parseCsvLine(line)[2];
    return name ? name.trim() : null;
}

export async function initGuestGreeting() {
    const rowNumber = parseInt(new URLSearchParams(window.location.search).get('guest'), 10);
    if (!rowNumber || rowNumber < 1) return;

    const eyebrow = document.querySelector('.invite-eyebrow');
    if (!eyebrow) return;

    try {
        const name = await fetchGuestName(rowNumber);
        if (name) {
            eyebrow.textContent = '';
            eyebrow.append(
                'Thanks for Confirming',
                document.createElement('br'),
                Object.assign(document.createElement('strong'), { textContent: name, className: 'invite-eyebrow-name' }),
                ', see you at...'
            );

            // Only godparents ("Ninong"/"Ninang" in their display name) need
            // the early-arrival reminder note.
            if (/ninong|ninang/i.test(name)) {
                const note = document.querySelector('.confirmed-note');
                if (note) note.classList.add('visible');
            }
        }
    } catch (err) {
        console.warn('Guest name lookup failed:', err);
    }
}
