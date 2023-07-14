#include "pxt.h"
#include "MicroBit.h"

using namespace pxt;

// Comment changes to cause Makecode to notice the file!
namespace DataLoggerPages {
    //%
    uint32_t nativeFlashLength() {
        codal::MicroBit uBit;

        return uBit.log.getDataLength( codal::DataFormat::CSV );
    }
}
